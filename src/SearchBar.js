import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');

class SearchBar extends Component{

    state = {

        number : 0,
        title : '',
        pictures : [],
        tags : [],
        image:'',
        heading : ''

    }

    Delay = (() => {

        var timer = 0;
        return function(callback, ms){
            clearTimeout(timer);
            timer = setTimeout(callback, ms)
        }
    })();

    image = (e) => {
        console.log(e.target.src);
        this.setState({ image : e.target.src , title : e.target.alt});
   }

    componentDidMount(){
        if(localStorage.length > 0 ){
            for(var i=0 ; i< localStorage.length; ++i){
                this.state.tags.push(localStorage.getItem( localStorage.key( i ) ));
            }
        }

        // this.setState({ title : ''});
        // fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e1bc9d0f81435a26b0167afd0deb0a98&&per_page=10&format=json&nojsoncallback=1`)
        // .then(res => {
        //     // console.log(res.json());
        //     return res.json()
        // })
        // .then(data => {
        //     // console.log('data' , data);
        //     this.setState({pictures : data.photos.photo});
        //     console.log('state' , this.state);
        // })

        this.props.searchTerm(this.state.title , this.state.pictures);
    }

    handleChange = (e) => {
        this.setState({ title : e.target.value});
    }

    onChange = (e) => {
        console.log(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1bc9d0f81435a26b0167afd0deb0a98&tags=${this.state.title}&per_page=10&format=json&nojsoncallback=1`);
        if(this.state.title){
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1bc9d0f81435a26b0167afd0deb0a98&tags=${this.state.title}&per_page=10&format=json&nojsoncallback=1`)
        .then(res => {
            // console.log(this.props.term);
            return res.json()
        })
        .then(data => {
            // console.log('data' , data);
            this.setState({pictures : data.photos.photo});
            // console.log('state' , this.state.pictures);
        })
        console.log('search state title', this.state.title);
        this.props.searchTerm(this.state.title, this.state.pictures);
    }

    }

    tagRedirect = (e) => {
        let searchTerm = e.target.innerHTML;
        console.log(e.target.innerHTML);
        this.setState({ title : searchTerm});
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1bc9d0f81435a26b0167afd0deb0a98&tags=${searchTerm}&per_page=10&format=json&nojsoncallback=1`)
        .then(res => {
            // console.log(this.props.term);
            return res.json()
        })
        .then(data => {
            // console.log('data' , data);
            this.setState({pictures : data.photos.photo});
            // console.log('state' , this.state.pictures);
        })
        // console.log(this.state);
        this.props.searchTerm(e.target.value, this.state.pictures);

    }

    onSubmit = (e) => {
        e.preventDefault();
        var n = uuidv4();
        this.setState({ number : n});
        let tags =[];
        if(this.state.title !== '' ){
            
            localStorage.setItem(`searchTerm${this.state.number}`,`${this.state.title}`);
            tags.push(localStorage.getItem(`searchTerm${this.state.number}`));
            this.state.tags.push(tags);

        }
        // this.setState({number : });
        console.log(`searchTerm${this.state.number}`, localStorage.getItem(`searchTerm${this.state.number}`));
        // this.props.searchTerm(this.state.pictures);
        
        console.log(this.state.tags);
        this.setState({ title :  ''});
        return n;
       
    }

    

    render() {
        return (
            <div>
            <div className = 'header'>
            <h1 > Search photos!</h1>
            
            <form className = 'header-text col-md-5' onSubmit= {this.onSubmit}>
                
               <span><input type= 'text' className = 'form-control' name = 'title' placeholder = 'Search'
                value = {this.state.title} onChange = {this.handleChange}
                onKeyUp ={() => {this.Delay(function(){this.onChange()}.bind(this), 500)}} autoComplete = 'off' />
                <input type = 'submit' value = 'submit' className = 'btn btn-primary' /></span>

            </form>
            {
                this.state.tags.map((tag) => (
                    <span className='tag' key = { uuidv4() } onClick= {this.tagRedirect}>{tag} </span>
                ))
            }
                
            
           
            
            </div>

    <div>
        <h1>  </h1>
        <div className='container'>
        
            {this.state.pictures.map( picture => (
             <img data-toggle="modal" onClick = {this.image} data-target="#exampleModalCenter" key = {picture.id} className ='col-md-3 img-fluid' alt = {picture.title} src={`https://farm${picture.farm}.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.jpg`}></img>
            ))}
        
        </div>



<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title" id="exampleModalLongTitle"> {this.state.title} </h5>
<button type="button" className="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>
<div className="modal-body">
<img alt = {this.state.heading} src = { this.state.image}></img>
</div>
<div className="modal-footer">
<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
{/* <button type="button" className="btn btn-primary">Save changes</button> */}
</div>
</div>
</div>
</div>
    </div>
    </div>
)
}    
}
export default SearchBar