import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from '@material-ui/core';
import ContentList from '../components/contentScript/ContentList';
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
import {
  subCredit,
  editLang,
  editPropmtStyle,
} from '../redux/action/userAction';
import { signUp } from '../redux/action/userAction';
import { RootState } from '../redux/reducer/store';
import FilterVintageRoundedIcon from '@mui/icons-material/FilterVintageRounded';
import { ToolIcon } from '../utils/ToolIcon';
const App = () => {
  const { history, user } = useSelector((state: RootState) => state);
  let myLang = user.lang;

  const [showBtn, setShowBtn] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [lang, setLang] = useState(myLang);
  const [ask, setAsk] = useState('');
  const [content, setContent] = useState('');
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
      setContent('');
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
        setContent('');
        setShowBtn(false);
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

    // .testDiv 요소가 이미 존재하는지 확인
    if (videoList && !document.querySelector('.testDiv')) {
      const testDiv = document.createElement('div');
      testDiv.className = 'testDiv';
      videoList.insertBefore(testDiv, videoList.firstChild);

      if (!document.querySelector('.testBtn')) {
        const testBtn = document.createElement('button');
        testBtn.className = 'testBtn';
        testBtn.textContent = 'Summarize video!';
        testDiv.appendChild(testBtn);

        if (!testBtn.dataset.listenerAdded) {
          testBtn.addEventListener('click', handleButtonClick);
          testBtn.dataset.listenerAdded = 'true'; // 리스너가 추가되었다는 플래그 설정
        }
      }
      const testBtn = document.querySelector('.testBtn');
      testBtn.addEventListener('click', handleButtonClick);
      const svgElement = document.querySelector('.svgDiv');
      svgElement.addEventListener('click', handleOptionBtn);
      console.log(showBtn, 'sssss');

      document.body.addEventListener('click', function (event) {
        if (event.target instanceof Element) {
          const closestCopyBtn = event.target.closest('.copyBtn');
          if (closestCopyBtn) {
            handleCopyBtn();
          }
        }
      });

      const firstChild = videoList.firstChild;
      if (firstChild) {
        videoList.insertBefore(firstElement, firstChild);
      } else {
        videoList.appendChild(firstElement);
      }
    }
  };

  const handleCopyBtn = () => {
    const contentDiv = document.querySelector('.contentDiv');
    let copyDiv = contentDiv.textContent;
    if (typeof copyDiv === 'string') {
      navigator.clipboard.writeText(copyDiv);
      console.log('Content copied to clipboard:', copyDiv);
    }
  };

  const handleOptionBtn = () => {
    chrome.runtime.sendMessage({ action: 'openOptionsPage' });
  };

  const handleButtonClick = () => {
    const currentURL = new URL(window.location.href);
    const newVideoId = currentURL.searchParams.get('v');

    if (newVideoId && newVideoId !== videoId) {
      setVideoId(newVideoId);
      setContent('');
      dispatch(createHistory(newVideoId, subCredit));
      dispatch(editLang());
      dispatch(editPropmtStyle());
    }
  };

  return (
    <div className="testH1">
      <Tooltip title={msg}>
        <div className="headerDiv">
          <div className="titleDiv">
            <FilterVintageRoundedIcon sx={{ fontSize: 16 }} />
            <p>Onno.ai</p>
          </div>

          <div className="svgDiv">
            <ToolIcon className="svg" size={24} />
          </div>
        </div>
      </Tooltip>

      <div className={showBtn ? 'contentDiv' : 'none'}>
        <ContentList content={content} showBtn={showBtn} />
      </div>
      <div>
        <button
          style={{ boxShadow: 'none' }}
          className={showBtn ? 'copyBtn' : 'none'}
        >
          Copy
        </button>
        <button className="testBtn">
          <span className="btnSpan">
            {loading ? <CircularProgress color="error" size={20} /> : ''}
          </span>
          <span className="empty"></span>
          {loading ? 'Generating...' : 'Summarize video!'}
        </button>
      </div>
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
