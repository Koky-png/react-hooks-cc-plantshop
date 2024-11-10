import React, { useEffect, useState } from "react";

import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(data => setPlants(data))
  }, [])

  const createPlant = (newPlant) => {
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    }

    fetch("http://localhost:6001/plants", configObject)
      .then(response => response.json())
      .then(data => setPlants([...plants, data]))
  }

  const deletePlant = (plantId) => {
    alert(`You're deleting plant ${plantId}`)
    fetch(`http://localhost:6001/plants/${plantId}`, { method: "DELETE" })
      .then(setPlants(plants.filter(plant => plant.id !== plantId)))
  }

  const updatePlant = (plantId, updatedPriceObject) => {
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPriceObject)
    }

    fetch(`http://localhost:6001/plants/${plantId}`, configObject)
      .then(response => response.json())
      .then(data => {
        const newPlantList = plants.map(plant => {
          return plant.id === data.id ? data : plant
        })

        setPlants(newPlantList)
        alert("Your price has been updated!")
      })
  }

  const filteredPlants = plants.filter(plant => (
    plant.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <main>
      <NewPlantForm createPlant={createPlant} />
      <Search
          search={search}
          setSearch={setSearch}
      />
      <PlantList
          deletePlant={deletePlant}
          plants={filteredPlants}
          updatePlant={updatePlant}
      />
    </main>
  );
}

export default PlantPage;
