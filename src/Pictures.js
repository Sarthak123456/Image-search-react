import React, {Component} from 'react';

class Pictures extends Component{
    state ={

        image:'',
        title : ''
    }

   image = (e) => {
        console.log(e.target.src);
        this.setState({ image : e.target.src , title : e.target.alt});
   }
    

    render(){
        return(
            <div>
                <h1>  </h1>
                <div className='container'>
                
                    {this.props.pictures.map( picture => (
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
        <img alt = {this.state.title} src = { this.state.image}></img>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        )
    }

    
}

export default Pictures