import App from './App';

it('denormalizes the fetched data', () => {
  const dataIn = [
    {
      name: 'Stand By Me',
      roles: [
        { name: 'Gorgie Lachance', actor: 'Wil Wheaton' },
        { name: 'Chris Chambers', actor: 'River Phoenix' },
        { name: 'Teddy Duchamp', actor: 'Corey Feldman' },
        { name: 'Ace Merrill', actor: 'Keifer Sutherland' },
        { name: 'The Writer', actor: 'Richard Dreyfuss' }
      ]
    },
    {
      name: 'Star Trek',
      roles: [
        { name: 'Romulan', actor: 'Wil Wheaton' },
        { name: 'Kirk', actor: 'Chris Pine' },
        { name: 'Nero', actor: 'Eric Bana' },
        { name: 'Spock', actor: 'Leonard Nimoy' },
        { name: 'Scotty', actor: 'Simon Pegg' },
        { name: 'Amanda Grayson', actor: 'Winona Ryder' }
      ]
    },
    {
      name: 'Flatliners',
      roles: [{ name: 'Dr Barry Wolfson', actor: 'Keifer Sutherland' }]
    }
  ];
  const dataOut = [
    { actor: 'Wil Wheaton', role: 'Gorgie Lachance', movie: 'Stand By Me' },
    { actor: 'River Phoenix', role: 'Chris Chambers', movie: 'Stand By Me' },
    { actor: 'Corey Feldman', role: 'Teddy Duchamp', movie: 'Stand By Me' },
    { actor: 'Keifer Sutherland', role: 'Ace Merrill', movie: 'Stand By Me' },
    { actor: 'Richard Dreyfuss', role: 'The Writer', movie: 'Stand By Me' },
    { actor: 'Wil Wheaton', role: 'Romulan', movie: 'Star Trek' },
    { actor: 'Chris Pine', role: 'Kirk', movie: 'Star Trek' },
    { actor: 'Eric Bana', role: 'Nero', movie: 'Star Trek' },
    { actor: 'Leonard Nimoy', role: 'Spock', movie: 'Star Trek' },
    { actor: 'Simon Pegg', role: 'Scotty', movie: 'Star Trek' },
    { actor: 'Winona Ryder', role: 'Amanda Grayson', movie: 'Star Trek' },
    {
      actor: 'Keifer Sutherland',
      role: 'Dr Barry Wolfson',
      movie: 'Flatliners'
    }
  ];
  expect(App.denormalizeData(dataIn)).toEqual(dataOut);
});
