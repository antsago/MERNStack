import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';

const apolloWrapper = withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:4000/',
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);

const withSSRApollo = Page => apolloWrapper(Page, { getDataFromTree });

export default withSSRApollo;