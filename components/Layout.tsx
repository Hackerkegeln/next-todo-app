import React from 'react';
import Head from 'next/head';
import {AppBar, Divider, Typography, WithStyles, withStyles} from '@material-ui/core';
import {styles} from '../theme';

interface Props extends WithStyles {
  title?: string
}

const Layout: React.FC<Props> = ({children, title = 'This is the default title', classes}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <div>
        <AppBar position="static" className={classes.title}>
          <Typography variant="h1">
            {title}
          </Typography>
        </AppBar>
      </div>
    </header>
    <main>
      {children}
    </main>
    <footer>
      <Divider />
      <span>Powered by the awesome Next.JS+Mongo+Material UI</span>
    </footer>
  </div>
);

export default withStyles(styles)(Layout);
