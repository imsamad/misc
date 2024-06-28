import { useRouteLoaderData } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

function NewsletterPage() {
  const token = useRouteLoaderData('root')
  return (
    <PageContent title="Join our awesome newsletter!">
       {token && <NewsletterSignup />}
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup successful!' };
}
