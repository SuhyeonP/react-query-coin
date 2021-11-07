import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps}/>
        <ReactQueryDevtools/>
    </QueryClientProvider>
)

export default App;
