import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentBox from './CommentBox';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CommentBox />, document.getElementById('root'));

serviceWorker.unregister();
