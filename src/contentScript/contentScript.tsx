import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from '@material-ui/core';

import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import './contentScript.css';
import {
  getStoredForm,
  getStoredUserInfo,
  setStorageCredit,
} from '../utils/storage';
import { CircularProgress } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../redux/reducer/store';
import { useDispatch, useSelector } from 'react-redux';
import { createHistory } from '../redux/action/historyAction';
import { subCredit, editLang } from '../redux/action/userAction';
import { signUp } from '../redux/action/userAction';
import { User } from '../utils/interface';
import { RootState } from '../redux/reducer/store';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    margin: theme.spacing(10),
    backgroundColor: theme.palette.common.white,
    fontSize: 30,
  },
}));

const App = () => {
  const classes = useStyles();
  const { history, user } = useSelector((state: RootState) => state);
  let myLang = user.lang;
  const [showBtn, setShowBtn] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [lang, setLang] = useState(myLang);
  const [ask, setAsk] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousURL, setPreviousURL] = useState('');
  const [userData, setUserData] = useState(null);

  let msg = `Remained Credit:${userData?.credit} `;
  const dispatch = useDispatch();
  useEffect(() => {
    if (history.loading) {
      // 로딩 상태 처리
      setLoading(true);
    } else if (history.data) {
      // 데이터가 성공적으로 로드되었을 때의 처리
      setContent(history.data);
      setShowBtn(true);
      setLoading(false);
    } else if (history.error) {
      // 에러 처리
      console.error('Error fetching history:', history.error);
      setContent([]);
      setShowBtn(false);
      setLoading(false);
    }
  }, [history]);

  useEffect(() => {
    setStorageCredit(user?.credit);
    setUserData(user);
  }, [user]);

  useEffect(() => {
    getStoredUserInfo().then((info) => {
      dispatch(
        signUp({
          email: info?.email,
          firstName: info?.family_name,
          lastName: info?.given_name,
          picture: info?.picture,
          credit: 10,
        })
      );
    });
  }, []);

  useEffect(() => {
    getStoredForm().then((form) => {
      setLang(form?.lang);
      setAsk(form?.ask);
    });
  }, []);

  useEffect(() => {
    console.log(lang, 'lang updated');
    console.log(ask, 'ask');
  }, [lang, ask]);

  useEffect(() => {
    // 관찰 대상 설정 (body 또는 특정 요소)
    const targetNode = document.body;

    // 관찰자 설정
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver((mutationsList, observer) => {
      const currentURL = window.location.href;
      if (currentURL !== previousURL) {
        console.log(currentURL, 'current');
        console.log(previousURL, 'prev');
        setContent([]);
        setPreviousURL(currentURL);
      }
    });

    // 관찰 시작
    observer.observe(targetNode, config);

    // 컴포넌트 언마운트 시 관찰 중지
    return () => {
      observer.disconnect();
    };
  }, [setContent, setPreviousURL, previousURL]);

  useEffect(() => {
    // 페이지 로드 시 또는 DOM 변화 감지 시 버튼 추가
    const observer = new MutationObserver((mutations) => {
      addContentButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 초기 실행
    addContentButton();

    return () => observer.disconnect();
  }, []);

  const addContentButton = () => {
    const videoList = document.querySelector('#secondary-inner');
    const testH1 = document.querySelectorAll('.testH1');
    const firstElement = testH1[0];

    if (videoList && !document.querySelector('.testDiv')) {
      const testDiv = document.createElement('div');
      testDiv.className = 'testDiv';
      videoList.insertBefore(testDiv, videoList.firstChild);

      const testBtn = document.querySelector('.testBtn');
      testBtn.addEventListener('click', handleButtonClick);

      const svgElement = document.querySelector('.svgDiv');
      svgElement.addEventListener('click', handleOptionBtn);

      const copyBtn = document.querySelector('.copyBtn');
      copyBtn.addEventListener('click', handleCopyBtn);

      const firstChild = videoList.firstChild;
      if (firstChild) {
        videoList.insertBefore(firstElement, firstChild);
      } else {
        videoList.appendChild(firstElement);
      }
    }
  };

  const handleCopyBtn = () => {
    console.log(content, 'content');
    const contentDiv = document.querySelector('.contentDiv');
    let copyDiv = contentDiv.innerHTML;
    if (typeof copyDiv === 'string') {
      navigator.clipboard.writeText(copyDiv);
      console.log('Content copied to clipboard:', copyDiv);
    }
  };

  const handleOptionBtn = () => {
    console.log('optionBtn');
    chrome.runtime.sendMessage({ action: 'openOptionsPage' });
  };

  const handleButtonClick = () => {
    const currentURL = new URL(window.location.href);
    const newVideoId = currentURL.searchParams.get('v');
    let id = userData?.data.data._id;
    if (newVideoId && newVideoId !== videoId) {
      setVideoId(newVideoId);
      setContent([]);
      dispatch(createHistory(newVideoId, subCredit));
      dispatch(editLang(id));
      console.log(history, 'userData!!!!!!!');
    }
  };

  return (
    <div className="testH1">
      <Tooltip title={msg} classes={{ tooltip: classes.customWidth }}>
        <div className="headerDiv">
          <h3>Pancake</h3>

          <div className="svgDiv">
            <svg viewBox="0 0 24 24" className="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-1.5 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                <path d="M12 1c.266 0 .532.009.797.028.763.055 1.345.617 1.512 1.304l.352 1.45c.019.078.09.171.225.221.247.089.49.19.728.302.13.061.246.044.315.002l1.275-.776c.603-.368 1.411-.353 1.99.147.402.349.78.726 1.128 1.129.501.578.515 1.386.147 1.99l-.776 1.274c-.042.069-.058.185.002.315.112.238.213.481.303.728.048.135.142.205.22.225l1.45.352c.687.167 1.249.749 1.303 1.512.038.531.038 1.063 0 1.594-.054.763-.616 1.345-1.303 1.512l-1.45.352c-.078.019-.171.09-.221.225-.089.248-.19.491-.302.728-.061.13-.044.246-.002.315l.776 1.275c.368.603.353 1.411-.147 1.99-.349.402-.726.78-1.129 1.128-.578.501-1.386.515-1.99.147l-1.274-.776c-.069-.042-.185-.058-.314.002a8.606 8.606 0 0 1-.729.303c-.135.048-.205.142-.225.22l-.352 1.45c-.167.687-.749 1.249-1.512 1.303-.531.038-1.063.038-1.594 0-.763-.054-1.345-.616-1.512-1.303l-.352-1.45c-.019-.078-.09-.171-.225-.221a8.138 8.138 0 0 1-.728-.302c-.13-.061-.246-.044-.315-.002l-1.275.776c-.603.368-1.411.353-1.99-.147-.402-.349-.78-.726-1.128-1.129-.501-.578-.515-1.386-.147-1.99l.776-1.274c.042-.069.058-.185-.002-.314a8.606 8.606 0 0 1-.303-.729c-.048-.135-.142-.205-.22-.225l-1.45-.352c-.687-.167-1.249-.749-1.304-1.512a11.158 11.158 0 0 1 0-1.594c.055-.763.617-1.345 1.304-1.512l1.45-.352c.078-.019.171-.09.221-.225.089-.248.19-.491.302-.728.061-.13.044-.246.002-.315l-.776-1.275c-.368-.603-.353-1.411.147-1.99.349-.402.726-.78 1.129-1.128.578-.501 1.386-.515 1.99-.147l1.274.776c.069.042.185.058.315-.002.238-.112.481-.213.728-.303.135-.048.205-.142.225-.22l.352-1.45c.167-.687.749-1.249 1.512-1.304C11.466 1.01 11.732 1 12 1Zm-.69 1.525c-.055.004-.135.05-.161.161l-.353 1.45a1.832 1.832 0 0 1-1.172 1.277 7.147 7.147 0 0 0-.6.249 1.833 1.833 0 0 1-1.734-.074l-1.274-.776c-.098-.06-.186-.036-.228 0a9.774 9.774 0 0 0-.976.976c-.036.042-.06.131 0 .228l.776 1.274c.314.529.342 1.18.074 1.734a7.147 7.147 0 0 0-.249.6 1.831 1.831 0 0 1-1.278 1.173l-1.45.351c-.11.027-.156.107-.16.162a9.63 9.63 0 0 0 0 1.38c.004.055.05.135.161.161l1.45.353a1.832 1.832 0 0 1 1.277 1.172c.074.204.157.404.249.6.268.553.24 1.204-.074 1.733l-.776 1.275c-.06.098-.036.186 0 .228.301.348.628.675.976.976.042.036.131.06.228 0l1.274-.776a1.83 1.83 0 0 1 1.734-.075c.196.093.396.176.6.25a1.831 1.831 0 0 1 1.173 1.278l.351 1.45c.027.11.107.156.162.16a9.63 9.63 0 0 0 1.38 0c.055-.004.135-.05.161-.161l.353-1.45a1.834 1.834 0 0 1 1.172-1.278 6.82 6.82 0 0 0 .6-.248 1.831 1.831 0 0 1 1.733.074l1.275.776c.098.06.186.036.228 0 .348-.301.675-.628.976-.976.036-.042.06-.131 0-.228l-.776-1.275a1.834 1.834 0 0 1-.075-1.733c.093-.196.176-.396.25-.6a1.831 1.831 0 0 1 1.278-1.173l1.45-.351c.11-.027.156-.107.16-.162a9.63 9.63 0 0 0 0-1.38c-.004-.055-.05-.135-.161-.161l-1.45-.353c-.626-.152-1.08-.625-1.278-1.172a6.576 6.576 0 0 0-.248-.6 1.833 1.833 0 0 1 .074-1.734l.776-1.274c.06-.098.036-.186 0-.228a9.774 9.774 0 0 0-.976-.976c-.042-.036-.131-.06-.228 0l-1.275.776a1.831 1.831 0 0 1-1.733.074 6.88 6.88 0 0 0-.6-.249 1.835 1.835 0 0 1-1.173-1.278l-.351-1.45c-.027-.11-.107-.156-.162-.16a9.63 9.63 0 0 0-1.38 0Z"></path>
              </svg>
            </svg>
          </div>
        </div>
      </Tooltip>

      <div className={showBtn ? 'contentDiv' : 'none'}>{content }</div>
      <button className="testBtn">
        Summarize video!
        <span className="btnSpan">
          {loading ? <CircularProgress color="error" size={30} /> : ''}
        </span>
      </button>

      <button className="copyBtn">Copy</button>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  root
);
