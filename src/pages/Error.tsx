import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <p className="paragraph1">
        Oups! La page que vous demandez n&apos;existe pas.
      </p>
      <Link to="/">
        <p className="paragraph2">Retournez sur la page d&apos;accueil </p>
      </Link>
    </div>
  );
};

export default Error;
