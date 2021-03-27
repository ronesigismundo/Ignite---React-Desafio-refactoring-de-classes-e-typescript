import { useState, useEffect } from 'react';

import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFoodsProps {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    image: string;    
}

interface IEditFoodsProps {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    image: string;
  }

const editFoodDefault ={
    id: 0,
    name: '',
    description: '',
    price: 0,
    available: false,
    image: '',
    editModalOpen: false
}  

export function Dashboard () {
  const [foods, setFoods] = useState<IFoodsProps[]>([])
  const [editingFood, setEditingFood] = useState<IEditFoodsProps>(editFoodDefault)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  
  /*
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
  }*/
  useEffect(() => {
   async function getFoods () {
      try {
        const response =  await api.get('/foods');
  
      setFoods(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getFoods();
    
  },[])

  async function handleAddFood (food: IFoodsProps ) {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood (food: IFoodsProps) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood (id:number ) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal () {

    setModalOpen(!modalOpen);
  }

  function toggleEditModal () {

    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood (food: IFoodsProps) {
    const editFood ={
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      available: food.available,
      image: food.image,
    }
    setEditingFood(editFood);
    setEditModalOpen(true)
  }


    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }