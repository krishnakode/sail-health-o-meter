import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { fetchData } from './LoansActions';

// Import Selectors
import { getLoans } from './LoansReducer';

class LoansPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    const { loans } = this.props;
    let list;
    if (loans && loans.length) {
      list = loans.map((loan, i) => {
        return (
          <div key={i}>
            <h2>{loan.name}</h2>
            <p>Health: {loan.health}</p>
          </div>
        );
      });
    }
    return (
      <div>
        <p>This is a really fancy list of loans</p>
        <hr />
        {list}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoansPage.need = [() => { return fetchData(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loans: getLoans(state),
  };
}

LoansPage.propTypes = {
  loans: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoansPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoansPage);
