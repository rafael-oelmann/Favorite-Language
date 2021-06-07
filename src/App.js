import logo from "./logo.svg";
import { Form, Card, Image, Icon } from "semantic-ui-react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favLang, setFavLang] = useState("");
  const [repos, setRepos] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const headers = {
    access_token: "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",
  };

  useEffect(() => {
    fetch(
      "https://api.github.com/users/example" +
        `?access_token=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`
    )
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

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(
      `https://api.github.com/users/${userInput}` +
        `?access_token=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`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          mostUsedLang();
          setError(null);
        }
      });
  };

  const mostUsedLang = async () => {
    setFavLang("loading...");
    const sumMap = {};
    const userResponse = await fetch(
      `https://api.github.com/users/${userInput}/repos?per_page=100` +
        `?access_token=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`
    );
    const userRepos = await userResponse.json();
    for (const repo of userRepos) {
      const rawRepo = await fetch(
        repo.languages_url +
          `?access_token=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`
      );
      const repoReq = await rawRepo.json();
      Object.keys(repoReq).forEach((language) => {
        if (!!!sumMap[language]) sumMap[language] = 0;
        sumMap[language] += repoReq[language];
      });
    }
    const mostUsed = Object.keys(sumMap).reduce((a, b) =>
      sumMap[a] > sumMap[b] ? a : b
    );
    setFavLang(mostUsed);
  };

  return (
    <div className="body">
      <div className="navbar">Favorite Programming Language</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github username"
              name="github username"
              onChange={handleSearch}
            />

            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <p>Favorite Programming Language:</p>
                <Icon name="code" />
                {favLang === "" ? "???" : favLang}
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
