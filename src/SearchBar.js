import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');

class SearchBar extends Component{

    state = {

        number : 0,
        title : '',
        pictures : [],
        tags : []

    }

    onChange = (e) => {
        this.setState({ title : e.target.value});
        if(e.target.value){
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1bc9d0f81435a26b0167afd0deb0a98&tags=${e.target.value}&per_page=10&format=json&nojsoncallback=1`)
        .then(res => {
            // console.log(this.props.term);
            return res.json()
        })
        .then(data => {
            // console.log('data' , data);
            this.setState({pictures : data.photos.photo});
            // console.log('state' , this.state.pictures);
        })
        console.log(this.state);
        this.props.searchTerm(e.target.value, this.state.pictures);
    }
    else{
        this.setState({ title : e.target.value});
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e1bc9d0f81435a26b0167afd0deb0a98&&per_page=10&format=json&nojsoncallback=1`)
        .then(res => {
            // console.log(this.props.term);
            return res.json()
        })
        .then(data => {
            // console.log('data' , data);
            this.setState({pictures : data.photos.photo});
            // console.log('state' , this.state.pictures);
        })

        this.props.searchTerm(this.state.title , this.state.pictures);
    }

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
    componentDidMount(){
        if(localStorage.length > 0 ){
            for(var i=0 ; i< localStorage.length; ++i){
                this.state.tags.push(localStorage.getItem( localStorage.key( i ) ));
            }
        }
    }

    render() {
        return (
            <div className = 'header'>
            <h1 > Search photos!</h1>
            
            <form className = 'header-text col-md-5' onSubmit= {this.onSubmit}>
               <span><input type= 'text' className = 'form-control' name = 'title' placeholder = 'Search' value = {this.state.title} onChange = {this.onChange} autoComplete = 'off' />
                <input type = 'submit' value = 'submit' className = 'btn btn-primary' /></span>
            </form>
            {
                this.state.tags.map((tag) => (
                    <span className='tag' >{tag} </span>
                ))
            }
                
            
           
            
            </div>
        )

    }
}
export default SearchBar