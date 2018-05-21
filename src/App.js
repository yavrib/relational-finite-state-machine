import React, { Component } from 'react';

// Actors => M N O Q T X Y Z

// Routes followed by categorized states
const routes = [
  [ 'Y', 'N' ],
  [ 'Y', 'Q', 'Z' ],
  [ 'Y', 'T', 'O' ],
  [ 'X', 'T', 'O', 'N' ],
  [ 'X', 'Q', 'O', 'M' ],
  [ 'Y', 'Q', 'O', 'N' ],
  [ 'Y', 'T', 'Z', 'M' ],
];

// Context API
const { Provider, Consumer } = React.createContext();

// First items of an array of arrays.
const getFirsts = arr => arr.map(i => i[0]);
// Create an array with unique elements from an array
const uniq = arr => arr.filter((v,i,a) => a.indexOf(v) === i)

let $changeCategory;
// Relational Flying Spaghetti Monster Engine
class RelationalFSMEngine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleNodes: uniq(getFirsts(routes)),
      activeRoutes: routes,
      visibleNodesHistory: [uniq(getFirsts(routes))],
      activeRoutesHistory: [routes]
    };

    $changeCategory = this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(category) {
    const {
      visibleNodes,
      activeRoutes,
      visibleNodesHistory,
      activeRoutesHistory
    } = this.state;

    let nextActiveRoutes;
    let nextVisibleNodes;
    let nextActiveRoutesHistory = [];
    let nextVisibleNodesHistory = [];

    nextActiveRoutes = activeRoutes.filter(routes => routes.includes(category));

    nextActiveRoutesHistory = activeRoutesHistory.concat([nextActiveRoutes]);

    nextVisibleNodes = nextActiveRoutes.map(routes => {
      const index = routes.indexOf(category);
      const nextItem = routes[index + 1];

      return nextItem;
    });

    nextVisibleNodesHistory = visibleNodesHistory.concat([nextVisibleNodes]);

    this.setState({
      visibleNodes: nextVisibleNodes,
      activeRoutes: nextActiveRoutes,
      activeRoutesHistory: nextActiveRoutesHistory,
      visibleNodesHistory: nextVisibleNodesHistory
    });
  }

  goBack() {
    const {
      activeRoutesHistory,
      visibleNodesHistory
    } = this.state;

    if (activeRoutesHistory.length === 1 || visibleNodesHistory === 1) {
      return null;
    }

    const newActiveRoutesHistory = activeRoutesHistory.slice(0, activeRoutesHistory.length - 2);
    const newVisibleNodesHistory = visibleNodesHistory.slice(0, visibleNodesHistory.length - 2);

    this.setState({
      ...this.state,
      activeRoutes: activeRoutesHistory[activeRoutesHistory.length - 2],
      activeRoutesHistory: (newActiveRoutesHistory.length && newActiveRoutesHistory) || [routes],
      visibleNodes: visibleNodesHistory[visibleNodesHistory.length - 2],
      visibleNodesHistory: (newVisibleNodesHistory.length && newVisibleNodesHistory) || [uniq(getFirsts(routes))]
    });
  }

  render() {
    const { children } = this.props;
    const { visibleNodes } = this.state;

    return (
      <div>
        { [1].map((route, index) =>
          (
            <div
              style={{
                border: '1px solid #333',
                position: 'absolute',
                right: '10px',
                top: `${60*index}px`,
                float: 'right',
                width: '100px',
                height: '20px',
                cursor: 'pointer',
                lineHeight: '20px',
                margin: '20px',
                backgroundColor: '#eaeaea'
              }}
              onClick={() => this.goBack()}
            >
              Go Back
            </div>)
          )
        }
        <Provider value={visibleNodes}>
          {children}
        </Provider>
      </div>
    );
  }
}

const RelationResolver = ({ type, children }) => {
  return (
    <Consumer>
      {visibleNodes => (
        <StateNode
          visibleNodes={visibleNodes}
          type={type}
        >
          {children}
        </StateNode>
      )}
    </Consumer>
  );
};

const StateNode = ({ visibleNodes, type, children }) => {
  const changeCategory = () => $changeCategory(type);

  if (!visibleNodes.includes(type)) {
    return null;
  }

  return (
    <div onClick={changeCategory}>
      {children}
    </div>
  );
}

const styles= {
  border: '1px solid #333',
  float: 'left',
  width: '100px',
  height: '20px',
  cursor: 'pointer',
  lineHeight: '20px',
  margin: '20px',
  backgroundColor: '#eaeaea'
}

// States
const S1 = (props) => <div style={styles} {...props}> {'S1 - X'} </div>;
const S2 = (props) => <div style={styles} {...props}> {'S2 - X'} </div>;
const S3 = (props) => <div style={styles} {...props}> {'S3 - Y'} </div>;
const S4 = (props) => <div style={styles} {...props}> {'S4 - Y'} </div>;
const A1 = (props) => <div style={styles} {...props}> {'A1 - Q'} </div>;
const A2 = (props) => <div style={styles} {...props}> {'A2 - Q'} </div>;
const A3 = (props) => <div style={styles} {...props}> {'A3 - Q'} </div>;
const A4 = (props) => <div style={styles} {...props}> {'A4 - T'} </div>;
const B1 = (props) => <div style={styles} {...props}> {'B1 - O'} </div>;
const B2 = (props) => <div style={styles} {...props}> {'B2 - O'} </div>;
const B3 = (props) => <div style={styles} {...props}> {'B3 - Z'} </div>;
const B4 = (props) => <div style={styles} {...props}> {'B4 - Z'} </div>;
const D1 = (props) => <div style={styles} {...props}> {'D1 - M'} </div>;
const D2 = (props) => <div style={styles} {...props}> {'D2 - N'} </div>;

class App extends Component {
  render() {
    return (
      <RelationalFSMEngine>
        <div className="App">
          <RelationResolver type={'X'}>
            <S1 />
          </RelationResolver>
          <RelationResolver type={'X'}>
            <S2 />
          </RelationResolver>
          <RelationResolver type={'Y'}>
            <S3 />
          </RelationResolver>
          <RelationResolver type={'Y'}>
            <S4 />
          </RelationResolver>
          <RelationResolver type={'Q'}>
            <A1 />
          </RelationResolver>
          <RelationResolver type={'Q'}>
            <A2 />
          </RelationResolver>
          <RelationResolver type={'Q'}>
            <A3 />
          </RelationResolver>
          <RelationResolver type={'T'}>
            <A4 />
          </RelationResolver>
          <RelationResolver type={'O'}>
            <B1 />
          </RelationResolver>
          <RelationResolver type={'O'}>
            <B2 />
          </RelationResolver>
          <RelationResolver type={'Z'}>
            <B3 />
          </RelationResolver>
          <RelationResolver type={'Z'}>
            <B4 />
          </RelationResolver>
          <RelationResolver type={'M'}>
            <D1 />
          </RelationResolver>
          <RelationResolver type={'N'}>
            <D2 />
          </RelationResolver>
        </div>
      </RelationalFSMEngine>
    );
  }
}

export default App;
