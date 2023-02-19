import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const data = [
  { id: 1, name: 'TEST', salary: 3000 },
  {
    id: 2,
    name: 'ROCK',
    salary: 1000,
  },
  {
    id: 3,
    name: 'SOLID',
    salary: 300,
  },
  {
    id: 4,
    name: 'SOLID',
    salary: 20,
  },
  {
    id: 5,
    name: 'SOLID',
    salary: 10,
  },
];

const routes = [
  {
    title: 'Home',
    path: '/home',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Product',
    path: '/product',
  },
];

const emojis = [
  {
    id: 1,
    emoji: '😊',
    title: 'smile',
  },
  {
    id: 2,
    emoji: '❤',
    title: 'heart',
  },
  {
    id: 3,
    emoji: '💋',
    title: 'kiss',
  },
];

const navLinks = [
  'home',
  'about',
  'downloads',
  'docs',
  'get involved',
  'security',
];

const Projects = () => {
  const [userData, setUserData] = useState(data);
  const [optionValue, setOptionValue] = useState('');
  const [input, setInput] = useState('');
  const [emojiSize, setEmojiSize] = useState(1);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    id: Math.floor(Math.random() * 100),
    name: '',
    salary: '',
  });

  const [newName, setNewName] = useState('');

  const handleIncreaseEmojiSize = () => {
    setEmojiSize((prev) => prev + 1);
  };
  const handleDecreaseEmojiSize = () => {
    setEmojiSize((prev) => prev - 1);
  };

  useEffect(() => {
    console.log(Math.random().toString(16).substring(2, 8));
  }, []);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };
  const handleOptionChange = (e) => {
    setOptionValue(e.target.value);

    const filteredData = userData.filter((val) => val.name === optionValue);
    setUserData(filteredData);
  };

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  //Adding of user
  const handleUpdateUserName = () => {
    setUserData((prev) => prev.map((item) => (item.name = newName)));
  };
  const handleAdd = () => {
    if (!userForm.name || !userForm.salary) {
      alert('Fields cannot be left empty');
    } else {
      const newUser = {
        ...userForm,
      };

      setUserData([newUser, ...userData]);

      console.log(userData);
      setUserForm({
        name: '',
        salary: '',
      });
    }
  };
  //Deleting of user

  const handleDelete = (userID) => {
    const newUser = userData.filter((val) => val.id !== userID);
    setUserData(newUser);
  };

  //Filtering of data
  const handleClear = () => {
    setUserData(data);
  };

  const handleClickEmoji = (emoji) => {
    alert(`your emoji is ${emoji}`);
  };

  const totalSalary = userData.reduce(
    (total, currValue) => total + currValue.salary.toLocaleString(),
    0
  );
  return (
    <div>
      <div style={{ paddingTop: '6rem' }}>
        {optionValue}
        <select onChange={handleOptionChange}>
          <option></option>
          <option value="SOLID">SOLID</option>
          <option value="ROCK">ROCK</option>
          <option value="TEST">TEST</option>
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        {routes.map((route) => (
          <div key={route.id}>
            <ul>
              <li onClick={() => navigate(route.path)}>{route.title}</li>
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        {navLinks.map((link) => (
          <ul key={link.id}>
            <li>{link.toUpperCase()}</li>
          </ul>
        ))}
      </div>
      <br />
      <input type="text" placeholder="Search here..." onChange={handleSearch} />
      <br />
      <button onClick={handleClear}>Clear</button>
      <input
        name="name"
        value={userForm.name}
        onChange={handleChange}
        type="text"
        placeholder="name"
      />
      <input
        name="salary"
        value={userForm.salary}
        onChange={handleChange}
        type="number"
        placeholder="salary"
      />
      <button onClick={handleAdd} style={{ marginTop: '5rem' }}>
        Add
      </button>
      <h1>Total number of users: {userData.length}</h1>
      <h1>Total number of salary: {totalSalary}</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {userData
          .filter((val) => {
            if (input === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(input.toLowerCase()) ||
              val.salary.toLocaleString().includes(input.toLocaleString())
            ) {
              return val;
            }
          })
          .map((val) => (
            <div
              key={val.id}
              style={{
                border: '1px solid black',
                width: '8rem',
                height: '8rem',
                margin: '2rem',
              }}
            >
              <input
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                style={{ width: 'inherit' }}
              />
              <button>Update Name</button>
              <h3>{val.name}</h3>
              <h3>{val.salary.toLocaleString()}</h3>
              <button onClick={() => handleDelete(val.id)}>Delete</button>
            </div>
          ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {emojis.map((emoji) => (
          <div key={emoji.id} style={{ margin: '1rem' }}>
            <p
              onClick={() => handleClickEmoji(emoji.emoji)}
              style={{
                cursor: 'pointer',
                fontSize: emojiSize + 'rem',
              }}
            >
              {emoji.emoji}
            </p>
          </div>
        ))}

        <button
          style={{ marginRight: '0.5rem' }}
          onClick={handleIncreaseEmojiSize}
        >
          Increase Emoji Size +
        </button>

        <button disabled={emojiSize <= 1} onClick={handleDecreaseEmojiSize}>
          Decrease Emoji Size -
        </button>
      </div>
    </div>
  );
};

export default Projects;
