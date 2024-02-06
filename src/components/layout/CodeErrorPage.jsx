import { Title, Text, Container } from '@mantine/core';
import classes from './CodeErrorPage.module.css';

export default function ServerError({ code, title, description = "" }) {
  return (

    <Container py={20} className={classes.root}>
      <div className={classes.label}>{code}</div>
      <Title className={classes.title}>{title}</Title>
    </Container>

  );
}