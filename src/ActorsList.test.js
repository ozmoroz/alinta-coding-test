import React from 'react';
import renderer from 'react-test-renderer';
import ActorsList from './ActorsList';

describe('ActorsList', () => {
  const actors = [
    { actor: 'Alex Borstein', roles: ['Lois Griffin'] },
    { actor: 'Patrick Warburton', roles: ['Joe Swanson'] },
    { actor: 'Seth Green', roles: ['Luke Skywalker', 'Chris Griffin'] },
    { actor: 'Mila Kunis', roles: ['Meg Griffin'] },
    { actor: 'Keifer Sutherland', roles: ['Dr Barry Wolfson', 'Ace Merrill'] },
    { actor: 'Richard Dreyfuss', roles: ['The Writer'] },
    { actor: 'River Phoenix', roles: ['Chris Chambers'] },
    { actor: 'Wil Wheaton', roles: ['Gorgie Lachance', 'Romulan'] },
    { actor: 'Corey Feldman', roles: ['Teddy Duchamp'] },
    { actor: 'Winona Ryder', roles: ['Amanda Grayson'] },
    { actor: 'Leonard Nimoy', roles: ['Spock'] },
    { actor: 'Eric Bana', roles: ['Nero'] },
    { actor: 'Chris Pine', roles: ['Kirk'] },
    { actor: 'Simon Pegg', roles: ['Scotty'] }
  ];

  it('renders correctly', () => {
    const tree = renderer.create(<ActorsList actors={actors} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
