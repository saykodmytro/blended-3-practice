import { Component } from "react";

import * as ImageService from "service/image-service";
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from "components";

export class Gallery extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    isEmpty: false, 
    isVisible: false,
  };
componentDidUpdate(_, prevState){
const {query, page} = this.state;
if(prevState.query !== query||prevState.page !== page){
  this.getPhotos(query, page)
}
}

getPhotos = async (query, page) => {
if(!query){
  return
}
this.setState({isLoading: true})
try {
  const {photos, total_results, per_page, page: currentPage} = await ImageService.getImages(query, page)
  if(photos.length === 0){
    this.setState({isEmpty: true})
  }
  
  this.setState(prevState => ({images:[...prevState.images, ...photos], isVisible: currentPage < Math.ceil(total_results/per_page)}))
} catch (error) {
  this.setState({ error: error.message });
}finally{this.setState({isLoading: false})}
}
  onHandleSubmit = (value) => {
    this.setState({ query: value, images: [], error: null, isEmpty: false, page: 1});

  };
onLoadMore = ()=> {
  this.setState(prevState => ({page: prevState.page + 1}))
}
  render() {
    const {images, isVisible, isLoading, error, isEmpty} = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
{error&& <Text textAlign="center"> Something went wrong - {error}</Text>}
{isEmpty&& <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
{images.length !== 0&& (
<Grid>
  {images.map(({id, avg_color,alt, src
}) => (
<GridItem key={id} >
  <CardItem color={avg_color}>
<img src={src.large} alt={alt}/>
  </CardItem>
</GridItem>

))}
</Grid>

)}
 {isVisible&&<Button disabled={isLoading} onClick={this.onLoadMore}>
{isLoading?'loading...': "loadMore"}
  </Button>}       
      </>
    );
  }
}
