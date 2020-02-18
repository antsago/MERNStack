import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';

const PostLink = ({ show }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${show.name}`}>
      <a>{show.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: red,
  },
});

const Index = props => (
  <Layout>
    <Button variant="contained" className={props.classes.button}>
      Default
    </Button>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <PostLink key={show.id} show={show} />
      ))}
    </ul>
    <style jsx>{`
        h1{
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }
    `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman');
  const data = res.data;

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default withStyles(styles)(Index);
