import React,{useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

//read
  useEffect(() => {
    Axios.get('http://localhost:8001/api/select').then((response) => {  
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

//create
    const submit= () => {
      Axios.post('http://localhost:8001/api/insert',{
        movieName: movieName,
        movieReview: movieReview
      },);
        
      setMovieList([...movieList, {
          movieName: movieName,
          movieReview: movieReview
        },]);
      
    }

//delete
    const deleteReview = (id) => {
      Axios.delete(`http://localhost:8001/api/delete/${id}`).then((response)=> {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    };

//update
const updateReview = (id) => {
  Axios.put(`http://localhost:8001/api/update`,{
    id: id,
    movieReview: newReview,
  }).then((response)=> {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
  setNewReview('');
};

  return (
    <div style={{textAlign:"center"}} >
    <h1>CRUd</h1>
    <div >
      mov name
    <input type='text' onChange={(e) => {setMovieName(e.target.value)}}></input>
      mov rev
    <input type='text' onChange={(e) => {setMovieReview(e.target.value)}}></input>
    <button onClick={submit}>Submit</button>
  
    {movieList.map((val) => {
      return (
      <div key={val.id} className='card'> 
      <h1 >Movie name: {val.mov_name} </h1> 
      <p > movie Review: {val.movrev}</p>
      <button onClick={() => {deleteReview(val.id)}}>Delete</button>
      <input onChange={(e) => {setNewReview(e.target.value)}} type='text'/>
      <button onClick={() => {updateReview(val.id)}}>Update</button>
      </div>
      )
    })
  }
    </div>
    </div>
  );
}

export default App;
