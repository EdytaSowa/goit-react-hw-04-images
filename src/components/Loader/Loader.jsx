import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css'
import {Component} from 'react';



export class Loader extends Component {
    render() {
      return (
        <div className={css.Loader}>
       <Bars
          height="300"
          width="300"
          color="#3f51b5"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </div>
      );
    }
  }

  
