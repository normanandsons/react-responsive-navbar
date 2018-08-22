import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import ExampleComponent from '../components/example.component';
import GithubLogo from '../images/logo-github.svg';

export default () => (
  <Grid>
    <Row>
      <Col xs={11} md={8} lg={6}>
        <Row>
          <Col xs={10}>
            <h3>React responsive navbar</h3>
          </Col>
          <Col xs={2}>
            <a
              href="https://github.com/OpusCapita/react-responsive-navbar"
              style={{ marginTop: '20px', display: 'block' }}
            >
              <GithubLogo />
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col xs={11} md={8} lg={6}>
        <Panel>
          <Panel.Heading>With NavItemBorder</Panel.Heading>
          <Panel.Body><ExampleComponent /></Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>With NavItemBorder & Component in options</Panel.Heading>
          <Panel.Body><ExampleComponent exampleId={2} /></Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>Custom height, With NavItemBorder & Component in options</Panel.Heading>
          <Panel.Body><ExampleComponent exampleId={3} /></Panel.Body>
        </Panel>

      </Col>

      <Col xs={11} md={8} lg={6}>
        <Panel>
          <Panel.Heading>Without NavItemBorder</Panel.Heading>
          <Panel.Body><ExampleComponent exampleId={4} /></Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>Without NavItemBorder & Component in options</Panel.Heading>
          <Panel.Body><ExampleComponent exampleId={5} /></Panel.Body>
        </Panel>

        <Panel>
          <Panel.Heading>Custom height, Without NavItemBorder & Component in options</Panel.Heading>
          <Panel.Body><ExampleComponent exampleId={6} /></Panel.Body>
        </Panel>

      </Col>
    </Row>
  </Grid>
);
