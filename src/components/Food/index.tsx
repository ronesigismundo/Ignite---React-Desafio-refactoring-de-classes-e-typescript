import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import { api } from '../../services/api';

export interface IFoodsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;    
}

interface IFoodProps{
  food: IFoodsProps,
  handleDelete: (id: number) => void;
  handleEditFood: ({
    id,
    name,
    description,
    price,
    available,
    image,   
  }:IFoodsProps) => void;
}

export function Food ({food, handleDelete, handleEditFood}: IFoodProps) {
  const [state, setState] = useState(food.available);
  /*
  constructor(props) {
    super(props);

    const { available } = this.props.food;
    this.state = {
      isAvailable: available
    };
  }*/
  /*
  async function toggleAvailable () {
    const { isAvailable } = this.state;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setState({ isAvailable: !isAvailable });
  }*/
  async function toggleAvailable () {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !state,
    });

    setState(!state);
  }

  function setEditingFood () {
    handleEditFood(food);
  }


    return (
      <Container available={state}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{state ? 'Dispon??vel' : 'Indispon??vel'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={state}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
  }
