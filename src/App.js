import React, { Component } from 'react';
import Search from './SearchBar'
import Pictures from './Pictures'
// import axios from ' axios';

class App extends Component {

  state = {
    searchTerm : '',
    pictures : []
  }
    searchTerm = (title, pictures) => {
      this.setState({ searchTerm : title , 
        pictures : pictures}); 
      // this.setState({ pictures : pictures }); 
      // console.log(this.state.searchTerm);
      // console.log('pictures in app.js' , this.state.pictures);
      
    }

    

    // componentDidMount(){
    //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1bc9d0f81435a26b0167afd0deb0a98&tags=${this.state.searchTerm}&per_page=3&format=json&nojsoncallback=1%22`)
    //   .then(res => {
    //     console.log(res);
    //   })
    // }
render(){
  return (
    <div className="App">
    
    <Search searchTerm = {this.searchTerm} />
    {/* <Pictures pictures = {this.state.pictures}/> */}
    </div>
  );
}
}

export default App;
