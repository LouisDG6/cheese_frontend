import {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {
    // State to hold our list of cheeses
    const [cheese, setCheese] = useState(null)

    // your deployed heroku URL
  const URL = "https://lgcheese.herokuapp.com/cheese/"

  // function to get updated list of cheese
  const getCheese = async () => {
    // make the api call
    const response = await fetch(URL)
    // turn the response in an object
    const data = await response.json()
    // set the state to the api data
    setCheese(data)
}

  // function that will later be passed data from our new/create form and make the post request to create a new cheese
  const createCheese = async (cheese) => {
    // make the post request to our API
    await fetch(URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cheese)
    })

    // get updated list of cheese
    getCheese()
}
  // function to update a person
  const updateCheese = async (cheese, id) => {
    // make the put request
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cheese)
    })
    // update the list of cheese
    getCheese()
}

// create function to delete a cheese
const deleteCheese = async (id) => {
    // make the delete request
    await fetch(URL + id, {
        method: "delete"
    })
    // update the list of cheese
    getCheese()
}



   // a useEffect to make a call to getPeople when page loads
   useEffect(() => {
    getCheese()
}, [])

return (
    <main>
      <Routes>
        <Route path="/" element={
        <Index cheese={cheese} createCheese={createCheese}/>
        } />
        <Route path="/cheese/:id" element={
        <Show cheese={cheese} updateCheese={updateCheese} deleteCheese={deleteCheese}/>} 
        />
      </Routes>
    </main>
  );
}

export default Main;