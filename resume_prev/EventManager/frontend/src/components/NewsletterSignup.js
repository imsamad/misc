import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  // const token = useRouteLoaderData()

  const ref = useRef();

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
      ref.current.value = "";
    }
  }, [data, state]);

  return (

     
        <fetcher.Form
          method="post"
          action="/newsletter"
          className={classes.newsletter}
        >
          <input
            type="email"
            placeholder="Sign up for newsletter..."
            aria-label="Sign up for newsletter"
            ref={ref}
          />
          <button>Sign up</button>
        </fetcher.Form>

  );
}

export default NewsletterSignup;
