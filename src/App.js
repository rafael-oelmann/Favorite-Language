import logo from "./logo.svg";
import { Form, Card, Image, Icon } from "semantic-ui-react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favLang, setFavLang] = useState("");
  const [repos, setRepos] = useState("");
  const [error, seterror] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ name, login, avatar_url, public_repos }) => {
    setUsername(login);
    setAvatar(avatar_url);
    setRepos(public_repos);
  };

  return (
    <div>
      <div className="navbar">Favorite Programming Language</div>
      <div className="search">
        <Form>
          <Form.Group>
            <Form.Input placeholder="Github username" name="github username" />

            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default App;
