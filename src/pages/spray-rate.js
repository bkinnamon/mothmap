import React from 'react'
import Layout from '../components/layout'
import Container from '../components/container'
import { withPrefix } from 'gatsby'

export default () => (
  <Layout>
    <Container>
      <h2>Calculating your Spray Rate</h2>
      <p>
        Most pheromone trap-based guidelines have been developed primarily to
        make silk spray decisions for corn earworm (CEW) control. Generally, an
        insecticide spray is applied to green silking corn as soon as more than
        one moth is captured over a five day period on a farm. Repeated
        applications are made at 2 to 6 day intervals depending on the
        cumulative number of CEW moths captured and the type of trap used.
      </p>
      <p>
        The below recommendations are for pheromone trapping using the Scentry
        nylon mesh trap and Hercon Heliocoverpa zea lure. For more information,
        and trap monitoring for other traps check the full{' '}
        <a href={withPrefix('/SweetCornDecisionManual.pdf')}>
          Sweet Corn Decision Manual
        </a>
        .
      </p>
      <p>
        Sprays are normally discontinued when the expected final harvest is less
        than six days away.
      </p>

      <table>
        <thead>
          <tr>
            <th colSpan="3">Average CEW moths captured per trap</th>
          </tr>
          <tr>
            <th>per day</th>
            <th>per 5 days</th>
            <th>per week</th>
            <th>Days between sprays</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 0.2</td>
            <td>&lt; 1</td>
            <td>&lt; 1.4</td>
            <td>spray at green silk then reassess</td>
          </tr>
          <tr>
            <td>0.2 - 0.5</td>
            <td>1 - 2.5</td>
            <td>1.4 - 3.5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>0.5 - 1</td>
            <td>2.5 - 5</td>
            <td>3.5 - 7</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1 - 13</td>
            <td>5 - 65</td>
            <td>7 - 91</td>
            <td>4</td>
          </tr>
          <tr>
            <td>&gt; 13</td>
            <td>&gt; 65</td>
            <td>&gt; 91</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </Container>
  </Layout>
)
