// @flow
import * as React from 'react';
import type { ActorData } from './types';

type Props = {
  actors: ?Array<ActorData>
};

/**
 * Render an info for a single actor
 */
const renderActor = (actor: ActorData) => (
  <li key={actor.actor}>
    {actor.actor}
    <ul>
      {actor.roles.map((role, roleIndex) => <li key={roleIndex}>{role}</li>)}
    </ul>
  </li>
);

const ActorsList = (props: Props) => {
  if (!props.actors) return null;
  return (
    <ul className="list-unstyled">
      {props.actors.map(actor => renderActor(actor))}
    </ul>
  );
};

export default ActorsList;
