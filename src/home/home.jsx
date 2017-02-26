import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import {Uid} from '../uid';
import {Header} from './header';

import hero from './hero.jpg';
import calendar from './calendar.png';
import chart from './chart.png';
import form from './form.png';

export const Home = () => (
  <Uid>
    {(uid) => (
      <HomePage uid={uid} />
    )}
  </Uid>
)

const HomePage = withRouter(({uid, push}) => (
  <main>
    <Header user={uid} />
    <Hero>
      <h1>Track your chronic pain.</h1>
      <HeroText>A simple web application for tracking/charting your daily pain levels.</HeroText>
    </Hero>
    <CardGrid>
      <Card onClick={() => uid && push('/days')}>
        <CardImage src={calendar} alt="Calendar" style={{width:'100%'}} />
        <CardText>
          <h4>Track your whole month</h4>
          <p>See your pain diary at a glance for an entire month.</p>
        </CardText>
      </Card>
      <Card onClick={() => uid && push('/days')}>
        <CardImage src={chart} alt="Chart" style={{width:'100%'}} />
        <CardText>
          <h4>Visualize your pain levels</h4>
          <p>See your pain levels across the month in a handy chart that also tracks your average pain level.</p>
        </CardText>
      </Card>
      <Card onClick={() => uid && push('/days')}>
        <CardImage src={form} alt="Form" style={{width:'100%'}} />
        <CardText>
          <h4>Simple entry form</h4>
          <p>Choose a date, then set your pain level. That's it! You can even keep notes for the day if you want to recall something beyond just pain level.</p>
        </CardText>
      </Card>
    </CardGrid>
  </main>
));

const Hero = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #efefef;

  &:after {
    content: '';
    position: absolute;
    background-image: url(${hero});
    background-size: cover;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`

const HeroText = styled.p`
  text-align: center;
`

const CardGrid = styled.div`
  margin-top: .5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-around;
  }
`
const Card = styled.section`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  transition: 0.3s;
  width: 300px;
  margin-bottom: .75rem;
  display:flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
  }
`

const CardImage = styled.img`
  display: block;
`;

const CardText = styled.div`
  padding: 2px 16px;
  background-color: #fff;
  flex-grow: 1;
`