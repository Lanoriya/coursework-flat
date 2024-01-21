import React from 'react';
import Slider from "react-slick";
import '../MainContent/MainContent.css';
import '../Infrastructure/Infrastructure.css';
import '../AboutFlat/AboutFlat.css';
import '../AboutSolo/AboutSolo.css';
import '../Location/Location.css';
import '../Location/map.css'

function MainContent() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className='main-content'>
      <div className='container main-container'>
        <h4 className='about-title-h4' id='about'>О проекте</h4>
        <div className='about-text'>
          <div className='about-text--left'>
            <p className='about-text--big'>Lanoriya - район на Мельникайте, создаваемый для комфортного и уютного проживания. 14 очередей строительства спроектированы таким образом, чтобы продумать каждую деталь для личного комфорта, сохранив при этом семейную атмосферу.</p>
            <p className='about-text--big'>Уникальное расположение комплекса не только позволяет оперативно добираться до центра и периферии города, но также выезжать на природу. Школа, детские сады, физкультурно-оздоровительный комплекс находятся в пешей доступности, но не мешают проживанию за счёт расположения в отдельной локации района.</p>
            <p className='about-text--big'>Каждая очередь имеет свой центр притяжения - изолированный двор с интерактивной площадкой для отдыха и развлечений.</p>
            <p className='about-text--big'>Lanoriya - это территория семейных ценностей.</p>
          </div>
          <div className='about-text--right'>
            <div className='about-text-block'>
              <div className='about-text-title'>Зеленое окружение</div>
              <p className='about-text-p'>внутри района нет парка, Lanoriya - это и есть парк</p>
            </div>
            <div className='about-text-block'>
              <div className='about-text-title'>Транспортный баланс</div>
              <p className='about-text-p'>безопасные дороги, пешеходные аллеи и отдельные велодорожки</p>
            </div>
            <div className='about-text-block'>
              <div className='about-text-title'>Разнообразие выбора</div>
              <p className='about-text-p'>разноэтажная застройка и разделение классов жилья по домам</p>
            </div>
          </div>
        </div>
        <div className='slider-box'>
          <Slider {...settings}>
            <div>
              <img className='slider-img' src={require('../imgs/about/1.jpg')} alt='photo1'/>
            </div>
            <div>
              <img className='slider-img' src={require('../imgs/about/2.jpg')} alt='photo2'/>
            </div>
            <div>
              <img className='slider-img' src={require('../imgs/about/3.jpg')} alt='photo3'/>
            </div>
            <div>
              <img className='slider-img' src={require('../imgs/about/4.jpg')} alt='photo4'/>
            </div>
            <div>
              <img className='slider-img' src={require('../imgs/about/5.jpg')} alt='photo5'/>
            </div>
            <div>
              <img className='slider-img' src={require('../imgs/about/6.jpg')} alt='photo6'/>
            </div>
          </Slider>
        </div>
        <div className='about-items'>
          <div className='about-item'>
            <div className='about-item--text'>
              <div className='about-textBlock'>
                <div className='item-header'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35">
                    <path id="b6eua" d="M28.926 29.012c-4.321 4.641-12.625 4.276-16.125 3.88l20.773-22.267c-.124 4.443-.835 14.292-4.648 18.387zm-24.35-11.969c-2.445-3.012-2.604-9.725-2.51-13.144l10.153 11.236c-1.108 1.561-1.834 3.301-2.295 5.075-2.319-.596-4.121-1.656-5.347-3.167zm10.836-9.22c.72.886 1.24 2.013 1.571 3.332-1.426.721-2.69 1.58-3.656 2.61l-9.781-10.827c3.372.566 9.492 1.96 11.866 4.884zm-3.906 23.901c-.639-3.434-1.576-11.748 3.046-16.712 3.84-4.123 13.527-5.318 17.816-5.652zm22.93-24.254c-.484.013-9.26.272-15.852 2.962-.4-1.452-1.007-2.715-1.837-3.736-3.791-4.668-14.885-5.796-15.356-5.842a.862.862 0 0 0-.634.2.889.889 0 0 0-.308.6c-.042.481-.99 11.844 2.8 16.51 1.476 1.817 3.601 3.077 6.308 3.761-.98 5.826.53 11.493.627 11.844.007.024.02.045.03.068a.887.887 0 0 0 .19.308c.006.007.008.016.014.023l.006.005c.072.069.157.12.247.161.027.012.053.019.08.028.033.012.065.029.1.036.227.044 2.62.496 5.774.496 4.289 0 9.985-.835 13.549-4.664 5.463-5.867 5.16-21.246 5.144-21.897-.01-.49-.424-.88-.882-.863z"></path>
                  </svg>
                </div>
                <h4 className='item-info'>Благоустройство</h4>
                <p className='item-paragraph'>Внутренний двор - это комплексное решение, являющееся и мини-парком, и местом для отдыха, и игровой зоной. Двор - то место, где каждый житель найдёт свой кусочек комфорта.</p>
              </div>
            </div>
            <div className='about-item--slider'>
              <div className='about-item--carousel'>
                <Slider {...settings}>
                  <div>
                    <img src={require('../MainContent/MainImgs/1.jpg')} alt='Mainphoto1'/>
                  </div>
                  <div>
                    <img src={require('../MainContent/MainImgs/2.jpg')} alt='Mainphoto2'/>
                  </div>
                  <div>
                    <img src={require('../MainContent/MainImgs/3.jpg')} alt='Mainphoto3'/>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className='about-item'>
            <div className='about-item--slider'>
              <div className='about-item--carousel'>
                <Slider {...settings} style={{ marginLeft: 0 }}>
                  <div>
                    <img src={require('../MainContent/MainImgs/4.jpg')} alt='Mainphoto4'/>
                  </div>
                  <div>
                    <img src={require('../MainContent/MainImgs/5.jpg')} alt='Mainphoto5'/>
                  </div>
                  <div>
                    <img src={require('../MainContent/MainImgs/6.jpg')} alt='Mainphoto6'/>
                  </div>
                </Slider>
              </div>
            </div>
            <div className='about-item--text'>
              <div className='about-textBlock'>
                <div className='item-header'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35">
                    <path id="b6eua" d="M28.926 29.012c-4.321 4.641-12.625 4.276-16.125 3.88l20.773-22.267c-.124 4.443-.835 14.292-4.648 18.387zm-24.35-11.969c-2.445-3.012-2.604-9.725-2.51-13.144l10.153 11.236c-1.108 1.561-1.834 3.301-2.295 5.075-2.319-.596-4.121-1.656-5.347-3.167zm10.836-9.22c.72.886 1.24 2.013 1.571 3.332-1.426.721-2.69 1.58-3.656 2.61l-9.781-10.827c3.372.566 9.492 1.96 11.866 4.884zm-3.906 23.901c-.639-3.434-1.576-11.748 3.046-16.712 3.84-4.123 13.527-5.318 17.816-5.652zm22.93-24.254c-.484.013-9.26.272-15.852 2.962-.4-1.452-1.007-2.715-1.837-3.736-3.791-4.668-14.885-5.796-15.356-5.842a.862.862 0 0 0-.634.2.889.889 0 0 0-.308.6c-.042.481-.99 11.844 2.8 16.51 1.476 1.817 3.601 3.077 6.308 3.761-.98 5.826.53 11.493.627 11.844.007.024.02.045.03.068a.887.887 0 0 0 .19.308c.006.007.008.016.014.023l.006.005c.072.069.157.12.247.161.027.012.053.019.08.028.033.012.065.029.1.036.227.044 2.62.496 5.774.496 4.289 0 9.985-.835 13.549-4.664 5.463-5.867 5.16-21.246 5.144-21.897-.01-.49-.424-.88-.882-.863z"></path>
                  </svg>
                </div>
                <h4 className='item-info'>Уникальность</h4>
                <p className='item-paragraph'>Сочетание лучших решений формирует неповторимый образ идеального для проживания района. Места общего пользования, эксплуатируемые кровли, прогулочные зоны, коворкинги и объекты Family-space создаются для того, чтобы соседи становились друзьями.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container infrastructure-container'>
        <div className='infrastructure-text'>
          <h4>Инфраструктура комплекса</h4>
          <p>В пешей доступности крупные торговые и торгово-развлекательные центры: «Кристалл», «Ашан», «Лента», «Метро». Рядом медицинские центры, парки и лес. Внутри района - рестораны, кафе, магазины, салоны красоты, фитнес-центры, спортивные кластеры.</p>
          <ul className='infrastructure-ul'>
            <li className='infrastructure-li'>
              <div className='infrastructure-li--img'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0747 17.0747 22 11 22C4.92525 22 0 17.0747 0 11C0 4.92433 4.92525 0 11 0C17.0747 0 22 4.92433 22 11" fill="#F59B23"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.27273 6.72727C8.27273 8.25455 9.47273 9.45455 11 9.45455C12.5273 9.45455 13.7273 8.25455 13.7273 6.72727C13.7273 5.2 12.5273 4 11 4C9.47273 4 8.27273 5.2 8.27273 6.72727ZM17 16C17 13.6 15.6364 11.5273 13.6727 10.5455C12.9091 11.0909 11.9818 11.4182 11 11.4182C9.96364 11.4182 9.09091 11.0909 8.32727 10.5455C6.36364 11.5273 5 13.6 5 16H17Z" fill="white"></path>
                </svg>
              </div>
              <span className='span-nofont'>—</span>
              <div className='infrastructure-li--text'>офис продаж</div>
            </li>
            <li className='infrastructure-li'>
              <div className='infrastructure-li--img'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0747 17.0747 22 11 22C4.92525 22 0 17.0747 0 11C0 4.92433 4.92525 0 11 0C17.0747 0 22 4.92433 22 11" fill="#008CC8"></path>
                  <path d="M9.71841 6.52551C9.5748 6.4537 9.5748 6.31009 9.71841 6.23828L10.0775 6.02285C10.2211 5.95104 10.2929 5.95104 10.3647 6.02285C11.011 6.52551 11.2982 7.09998 11.37 7.88988C11.1546 7.96169 10.9392 7.96169 10.7237 7.96169C10.5083 7.38722 10.2211 6.88456 9.71841 6.52551ZM11.4418 8.24892C14.0988 6.66913 16.9711 8.82339 15.8222 12.1266C15.1759 13.9218 13.7397 16.9378 11.2264 15.717C11.1546 15.6452 11.011 15.6452 10.8674 15.717C8.35405 16.9378 6.91787 13.9218 6.27159 12.1266C5.05084 8.82339 7.92319 6.66913 10.6519 8.24892C10.8674 8.32073 11.1546 8.32073 11.4418 8.24892Z" fill="white"></path>
                </svg>
              </div>
              <span className='span-nofont'>—</span>
              <div className='infrastructure-li--text'>продуктовый рынок</div>
            </li>
            <li className='infrastructure-li'>
              <div className='infrastructure-li--img'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0747 17.0747 22 11 22C4.92525 22 0 17.0747 0 11C0 4.92433 4.92525 0 11 0C17.0747 0 22 4.92433 22 11" fill="#E6500F"></path>
                  <path d="M13.2058 10.8882C14.5823 11.1941 14.9647 12.0352 14.9647 12.7235C14.9647 13.3352 14.7352 13.7176 14.5058 13.8705C13.9705 14.4058 13.0529 14.4823 11.9823 14.4823C11.7529 14.4823 11.5235 14.4823 11.2176 14.4823C10.9882 14.4823 10.8352 14.4823 10.6058 14.4823C9.76466 14.4823 9.76466 14.9411 9.76466 15.0941C9.76466 15.4764 9.99407 15.6294 10.4529 15.7823C11.0647 16.0117 11.3705 16.0117 11.6764 16.3176C11.9823 16.547 12.1352 16.7764 12.0588 17.2352C12.0588 17.6176 11.8294 17.9235 11.1411 17.9999C11.6 17.7705 11.5235 17.3117 11.0647 17.3117C10.9117 17.3117 10.8352 17.3117 10.6823 17.2352C8.92348 16.7764 8.38819 16.3176 8.38819 15.1705C8.38819 14.3294 8.77054 13.3352 10.0705 13.1058C10.147 13.1058 10.3 13.1058 10.3764 13.1058H11.2176C11.8294 13.1058 12.4411 13.1058 12.8235 13.1058C13.3588 13.0294 13.4352 13.0294 13.5117 12.9529C13.5117 12.9529 13.5117 12.9529 13.5117 12.8C13.5117 12.647 13.5117 12.4941 12.8999 12.3411C12.2882 12.1882 11.2941 12.1882 10.3 12.1882C9.22937 12.1882 8.31172 11.8823 7.54701 11.1941C6.78231 10.5823 6.39996 9.66466 6.32349 8.74702V8.67055C6.32349 7.44702 6.93525 6.37643 7.8529 5.6882C8.69407 5.07643 9.76466 4.61761 12.1352 5.45879C12.5176 5.61173 12.9764 5.91761 12.8235 6.68231C12.747 7.06467 12.0588 6.91173 11.6764 6.75879C10.2235 6.22349 9.45878 6.22349 8.69407 6.75879C8.08231 7.14114 7.77643 7.82937 7.77643 8.59408C7.77643 9.74113 8.92348 10.5823 10.3 10.5823C11.6 10.7353 12.5176 10.7353 13.2058 10.8882ZM9.30584 7.7529H15.5764C15.5764 9.0529 14.1999 10.047 12.4411 10.047C10.6823 10.047 9.30584 8.97643 9.30584 7.7529Z" fill="white"></path>
                </svg>
              </div>
              <span className='span-nofont'>—</span>
              <div className='infrastructure-li--text'>больничный комплекс «Нефтяник»</div>
            </li>
            <li className='infrastructure-li'>
              <div className='infrastructure-li--img'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11C22 17.0747 17.0747 22 11 22C4.92525 22 0 17.0747 0 11C0 4.92433 4.92525 0 11 0C17.0747 0 22 4.92433 22 11" fill="#3EB57C"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.3835 8.13671C14.3835 6.38188 12.8316 5 10.9163 5C8.99929 5 7.44648 6.55281 7.44648 8.46983C7.44648 9.2761 8.04978 9.56605 8.04978 9.56605C8.04978 9.56605 7 10.0033 7 11.1735C7 12.4427 8.03006 13.4719 9.29922 13.4719C9.69685 13.4719 9.82163 13.3622 10.1481 13.184V16.2222C10.1481 16.577 10.5132 17 11.0346 17C11.5559 17 11.8388 16.577 11.8388 16.2222V13.184C12.1473 13.3185 12.3234 13.3802 12.6808 13.3802C14.0673 13.3802 15.1925 12.2559 15.1925 10.8685C15.1925 9.44987 13.902 9.25939 13.902 9.25939C13.902 9.25939 14.3835 8.84205 14.3835 8.13671Z" fill="white"></path>
                </svg>
              </div>
              <span className='span-nofont'>—</span>
              <div className='infrastructure-li--text'>природный парк</div>
            </li>
            <li className='infrastructure-li'>
              <div className='infrastructure-li--img'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 11C22 17.0747 17.0747 22 11 22C4.92525 22 0 17.0747 0 11C0 4.92433 4.92525 0 11 0C17.0747 0 22 4.92433 22 11" fill="#234B9B"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.69758 9.17576L16 9.20932L15.1773 12.7539L15.0243 12.7772C14.9683 13.0276 14.7685 13.2307 14.5025 13.272L9.88431 13.9888C9.80782 13.9957 9.72368 14 9.63444 14C9.00129 14 8.10042 13.7806 7.70438 12.9579C6.84261 11.1671 6.22475 8.67578 6.00888 7.73433L4.45531 7.26361C4.11791 7.16121 3.92584 6.8015 4.02698 6.46072C4.12896 6.11908 4.48251 5.92546 4.82076 6.027L7.09417 6.7163L7.17321 7.09064C7.17661 7.10785 7.37038 8.01832 7.69758 9.17576ZM9 15C8.44753 15 8 15.4475 8 16C8 16.5517 8.44753 17 9 17C9.55247 17 10 16.5517 10 16C10 15.4475 9.55247 15 9 15ZM13.9996 15C13.4472 15 13 15.4471 13 15.9993C13 16.5515 13.4472 17 13.9996 17C14.552 17 15 16.5515 15 15.9993C15 15.4471 14.552 15 13.9996 15Z" fill="white"></path>
                </svg>
              </div>
              <span className='span-nofont'>—</span>
              <div className='infrastructure-li--text'>крупные торговые центры</div>
            </li>
          </ul>
        </div>
        <div className='infrastructure-img'>
          <img src={require('../Infrastructure/infrastructure.png')} alt='infraPhoto'/>
        </div>
      </div>
      <div className='container about-flat-container'>
        <div className='about-item about-flat'>
          <div className='about-item--img'>
            <img src={require('../AboutFlat/houses.jpg')} alt='houses'/>
          </div>
          <div className='about-item--text'>
            <div className='about-textBlock'>
              <div className='item-header'>
                <svg width="49" height="48" viewBox="0 0 49 48" fill="#44b3b4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.8987 5L29.8987 24C29.8987 24 31.9266 26 33.3987 26C34.8708 26 36.8987 24 36.8987 24L36.8987 5C36.8987 5 34.8708 7 33.3987 7C31.9266 7 29.8987 5 29.8987 5Z" fill="#DD6E25"></path>
                  <path d="M29.8987 24V43C29.8987 43 31.9266 45 33.3987 45C34.8708 45 36.8987 43 36.8987 43V24C36.8987 24 34.8708 26 33.3987 26C31.9266 26 29.8987 24 29.8987 24Z" fill="#DD6E25"></path>
                  <path d="M29.8987 24L29.8987 5C29.8987 5 31.9266 7 33.3987 7C34.8708 7 36.8987 5 36.8987 5L36.8987 24M29.8987 24C29.8987 24 31.9266 26 33.3987 26C34.8708 26 36.8987 24 36.8987 24M29.8987 24V43C29.8987 43 31.9266 45 33.3987 45C34.8708 45 36.8987 43 36.8987 43V24" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M12.8987 5L12.8987 24C12.8987 24 14.9266 26 16.3987 26C17.8708 26 19.8987 24 19.8987 24L19.8987 5C19.8987 5 17.8708 7 16.3987 7C14.9266 7 12.8987 5 12.8987 5Z" fill="#DD6E25"></path>
                  <path d="M12.8987 24V43C12.8987 43 14.9266 45 16.3987 45C17.8708 45 19.8987 43 19.8987 43V24C19.8987 24 17.8708 26 16.3987 26C14.9266 26 12.8987 24 12.8987 24Z" fill="#DD6E25"></path>
                  <path d="M12.8987 24L12.8987 5C12.8987 5 14.9266 7 16.3987 7C17.8708 7 19.8987 5 19.8987 5L19.8987 24M12.8987 24C12.8987 24 14.9266 26 16.3987 26C17.8708 26 19.8987 24 19.8987 24M12.8987 24V43C12.8987 43 14.9266 45 16.3987 45C17.8708 45 19.8987 43 19.8987 43V24" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M12.8987 24V5C12.8987 5 10.0017 3 7.89868 3C5.79564 3 2.89868 5 2.89868 5V24C2.89868 24 5.79564 22 7.89868 22C10.0017 22 12.8987 24 12.8987 24Z" fill="#F99D27"></path>
                  <path d="M12.8987 43V24C12.8987 24 10.0017 22 7.89868 22C5.79564 22 2.89868 24 2.89868 24V43C2.89868 43 5.79564 41 7.89868 41C10.0017 41 12.8987 43 12.8987 43Z" fill="#F99D27"></path>
                  <path d="M12.8987 24V5C12.8987 5 10.0017 3 7.89868 3C5.79564 3 2.89868 5 2.89868 5V24M12.8987 24C12.8987 24 10.0017 22 7.89868 22C5.79564 22 2.89868 24 2.89868 24M12.8987 24V43C12.8987 43 10.0017 41 7.89868 41C5.79564 41 2.89868 43 2.89868 43V24" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M29.8987 24V5C29.8987 5 27.0017 3 24.8987 3C22.7956 3 19.8987 5 19.8987 5V24C19.8987 24 22.7956 22 24.8987 22C27.0017 22 29.8987 24 29.8987 24Z" fill="#F99D27"></path>
                  <path d="M29.8987 43V24C29.8987 24 27.0017 22 24.8987 22C22.7956 22 19.8987 24 19.8987 24V43C19.8987 43 22.7956 41 24.8987 41C27.0017 41 29.8987 43 29.8987 43Z" fill="#F99D27"></path>
                  <path d="M29.8987 24V5C29.8987 5 27.0017 3 24.8987 3C22.7956 3 19.8987 5 19.8987 5V24M29.8987 24C29.8987 24 27.0017 22 24.8987 22C22.7956 22 19.8987 24 19.8987 24M29.8987 24V43C29.8987 43 27.0017 41 24.8987 41C22.7956 41 19.8987 43 19.8987 43V24" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M46.8987 24V5C46.8987 5 44.0017 3 41.8987 3C39.7956 3 36.8987 5 36.8987 5V24C36.8987 24 39.7956 22 41.8987 22C44.0017 22 46.8987 24 46.8987 24Z" fill="#F99D27"></path>
                  <path d="M46.8987 43V24C46.8987 24 44.0017 22 41.8987 22C39.7956 22 36.8987 24 36.8987 24V43C36.8987 43 39.7956 41 41.8987 41C44.0017 41 46.8987 43 46.8987 43Z" fill="#F99D27"></path>
                  <path d="M46.8987 24V5C46.8987 5 44.0017 3 41.8987 3C39.7956 3 36.8987 5 36.8987 5V24M46.8987 24C46.8987 24 44.0017 22 41.8987 22C39.7956 22 36.8987 24 36.8987 24M46.8987 24V43C46.8987 43 44.0017 41 41.8987 41C39.7956 41 36.8987 43 36.8987 43V24" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className='about-flat-text'>
                <h4>Эксплуатируемая крыша</h4>
                <p>Внутренний двор — это комплексное решение, являющееся и мини-парком, и местом для отдыха, и игровой зоной. Двор — то место, где каждый житель найдёт свой кусочек комфорта.</p>
                <ul className='about-flat-ul'>
                  <li className='about-flat-li'>Восхитительные виды</li>
                  <li className='about-flat-li'>Экологичные материалы</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='about-item about-flat'>
          <div className='about-item--text'>
            <div className='about-textBlock'>
              <div className='item-header'>
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="5" width="25" height="38" fill="#91D2F0"></rect>
                  <rect x="4" y="43" width="41" height="4" fill="#FFD764" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></rect>
                  <path fillRule="evenodd" clipRule="evenodd" d="M40 2H9V43H12V5H37V43H40V2Z" fill="#FAD77A"></path>
                  <path d="M9 2V1.4C8.66863 1.4 8.4 1.66863 8.4 2H9ZM40 2H40.6C40.6 1.66863 40.3314 1.4 40 1.4V2ZM9 43H8.4C8.4 43.3314 8.66863 43.6 9 43.6V43ZM12 43V43.6C12.3314 43.6 12.6 43.3314 12.6 43H12ZM12 5V4.4C11.6686 4.4 11.4 4.66863 11.4 5H12ZM37 5H37.6C37.6 4.66863 37.3314 4.4 37 4.4V5ZM37 43H36.4C36.4 43.3314 36.6686 43.6 37 43.6V43ZM40 43V43.6C40.3314 43.6 40.6 43.3314 40.6 43H40ZM9 2.6H40V1.4H9V2.6ZM9.6 43V2H8.4V43H9.6ZM12 42.4H9V43.6H12V42.4ZM12.6 43V5H11.4V43H12.6ZM12 5.6H37V4.4H12V5.6ZM36.4 5V43H37.6V5H36.4ZM40 42.4H37V43.6H40V42.4ZM39.4 2V43H40.6V2H39.4Z" fill="#2B2E32"></path>
                  <path d="M22 5H24.5H27V43H24.5H22V5Z" fill="#FFD764"></path>
                  <path d="M24.5 43H27V5H24.5M24.5 43H22V5H24.5M24.5 43V5" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M3.99996 43H42C42 43 44.1156 40.438 44.9 38.5C45.7084 36.5026 43.6948 33.7052 43.4999 31.5C43.3239 29.5085 45 28 45 28H3.99996C3.99996 28 5.67607 29.5085 5.50005 31.5C5.30514 33.7052 3.29158 36.5026 4.1 38.5C4.88437 40.438 7 43 7 43" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M14 34H35C35 34 35.6773 36.7407 35.5 38.5C35.3143 40.3431 34 43 34 43H15C15 43 13.6858 40.3431 13.5 38.5C13.3228 36.7407 14 34 14 34Z" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></path>
                  <path d="M24.3163 33.3314C24.3163 33.3314 15.5282 31.3283 16.7366 23.4299C16.7366 23.4299 25.5305 25.4183 24.3163 33.3314Z" fill="#008048" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M32.3163 23.429C32.3163 23.429 23.5282 25.432 24.7366 33.3305C24.7366 33.3305 33.5305 31.3421 32.3163 23.429Z" fill="#008048" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <rect x="14" y="30" width="21" height="4" fill="#DC6914" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></rect>
                  <circle cx="44.5" cy="26.5" r="2.5" fill="#234B9B" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></circle>
                  <circle cx="4.5" cy="26.5" r="2.5" fill="#234B9B" stroke="#2B2E32" strokeWidth="1.2" strokeLinejoin="round"></circle>
                </svg>
              </div>
              <div className='about-flat-text'>
                <h4>Террасы</h4>
                <p>Террасы на первых и вторых этажах - это дополнительное личное пространство. Террасы естественным образом изолированы от постороннего проникновения, не нарушая при этом атмосферы добрососедства.</p>
              </div>
            </div>
          </div>
          <div className='about-item--img'>
            <img src={require('../AboutFlat/terra.jpg')} alt='terra'/>
          </div>
        </div>
        <div className='about-item about-flat'>
          <div className='about-item--img'>
            <img src={require('../AboutFlat/childs.jpg')} alt='childs'/>
          </div>
          <div className='about-item--text'>
            <div className='about-textBlock'>
              <div className='about-flat-text' style={{marginBottom: '200px'}}>
                <h4>Хотите квартиру мечты?</h4>
                <p>Все возможно в Микрорайоне «Lanoriya».</p>
                <div className='header-callback about-callback'>
                  <a href='/' className='callback-tel-pop'>Заказать звонок</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='about-solo'>
        <div className='container flat-photo'>
          <div className='about-solo-text'>
            <h2>Квартиры</h2>
            <p>Квартиры в комплексе продуманы под различные варианты расстановки мебели и оптимальные маршруты перемещения. Комнаты правильной прямоугольной формы, близкой к квадрату. Отсутствуют лишние углы и выступы.</p>
            <p>Установлена горизонтальная разводка отопления. Нет стояков около окон. В каждой квартире балкон или лоджия не менее 3 м<span className='span-nofont'>²</span>. Квартиры сдаются с предчистовой отделкой.</p>
          </div>
          <div className='about-solo-img'>
            <img src={require('../AboutSolo/flat.png')} alt='flat'/>
          </div>
        </div>
      </div>
      <div className='container container-location' id='location'>
        <div className='location-block'>
          <h2 name='Расположение'>Расположение</h2>
          <div className='location-text-block'>
            <div className='location-text'>
              <div className='location-item'>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="#44b3b4" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M39.232 18.0038C39.232 9.59501 32.4777 2.70251 24.0692 2.70251C15.5223 2.70251 8.76782 9.5953 8.76782 18.0038C8.76782 26.4124 23.5178 45.2974 24.0692 45.2974C24.62 45.2974 39.232 26.4124 39.232 18.0038ZM23.9998 25.2561C28.267 25.2561 31.7264 21.7967 31.7264 17.5295C31.7264 13.2623 28.267 9.8031 23.9998 9.8031C19.7326 9.8031 16.2733 13.2623 16.2733 17.5295C16.2733 21.7967 19.7326 25.2561 23.9998 25.2561Z" fill="#F99D27" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M8.76782 18.0038C8.76782 9.5953 15.5223 2.70251 24.0692 2.70251C16.3027 4.84365 5.42966 16.3602 24.0692 45.2974C23.5178 45.2974 8.76782 26.4124 8.76782 18.0038Z" fill="#008CC8" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className='location-item'>Южнее пересечения улицы Федюнинского и Мельникайте</div>
            </div>
            <div className='location-text'>
              <div className='location-item'>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="#44b3b4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 44.5L21.5 34L23.8214 31.5L28 27H21.5L16 33L13 43.5L17.5 44.5Z" fill="#F99D27" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <circle cx="24" cy="5.98609" r="4.81056" fill="#FFD764" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></circle>
                  <path d="M21.1875 35.2361L16.9952 46.2409C16.8185 46.7047 16.3283 46.9688 15.8438 46.8611L12.6612 46.1539C12.0992 46.029 11.7584 45.4565 11.9166 44.9029L15 34.1111L21.1875 27.3611H28.5L31.3125 36.9236L37.8602 42.9676C38.2776 43.3529 38.2907 44.0079 37.889 44.4095L35.9006 46.398C35.5329 46.7657 34.9446 46.7902 34.5476 46.4542L27.9375 40.8611L23.7991 32.4236L21.1875 35.2361Z" fill="#008CC8"></path>
                  <path d="M28.5 27.3611L31.3125 36.9236L37.8602 42.9676C38.2776 43.3529 38.2907 44.0079 37.889 44.4095L35.9006 46.398C35.5329 46.7657 34.9446 46.7902 34.5476 46.4542L27.9375 40.8611L23.7991 32.4236M28.5 27.3611L23.7991 32.4236M28.5 27.3611H21.1875L15 34.1111L11.9166 44.9029C11.7584 45.4565 12.0992 46.029 12.6612 46.1539L15.8438 46.8611C16.3283 46.9688 16.8185 46.7047 16.9952 46.2409L21.1875 35.2361L23.7991 32.4236" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16.9952 46.2409L21.1875 35.2361L23.7991 32.4236L28.5 27.3611H21.1875L15 34.1111L11.9166 44.9029C11.7584 45.4565 12.0992 46.029 12.6612 46.1539L15.8438 46.8611C16.3283 46.9688 16.8185 46.7047 16.9952 46.2409Z" fill="#008CC8" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M36.9375 17.7986L27.375 12.1736H21.1875L13.875 20.0486L12.2502 19.9009L10.4386 24.5083L15.5625 25.1111L21.1875 19.4861V27.3611H28.5V18.9236L33.5625 22.2986L35.8125 25.9548L40.2133 23.9861L36.9375 17.7986Z" fill="#E6500F" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M38.903 29.1308L41.1593 27.8415C41.6279 27.5737 41.7995 26.9824 41.547 26.5053L40.2132 23.9861L35.8125 25.9548L37.5552 28.7867C37.838 29.2463 38.4344 29.3985 38.903 29.1308Z" fill="#FFD764"></path>
                  <path d="M7.41983 20.1999L6.44818 22.7909C6.22023 23.3988 6.62291 24.0594 7.26766 24.1352L10.4386 24.5083L12.2501 19.9009L8.44669 19.5551C7.99828 19.5143 7.57793 19.7783 7.41983 20.1999Z" fill="#FFD764"></path>
                  <path d="M15.5625 25.1111L10.4386 24.5083M13.875 20.0486L12.2501 19.9009M10.4386 24.5083L7.26766 24.1352C6.62291 24.0594 6.22023 23.3988 6.44818 22.7909L7.41983 20.1999C7.57793 19.7783 7.99828 19.5143 8.44669 19.5551L12.2501 19.9009M10.4386 24.5083L12.2501 19.9009M35.8125 25.9548L37.5552 28.7867C37.838 29.2463 38.4344 29.3985 38.903 29.1308L41.1593 27.8415C41.6279 27.5737 41.7995 26.9824 41.547 26.5053L40.2132 23.9861L35.8125 25.9548Z" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className='location-item'>10 минут на автомобиле до улицы Республики</div>
            </div>
            <div className='location-text'>
              <div className='location-item'>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="#44b3b4" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8.28577" y="8.28564" width="31.4286" height="12.5714" fill="#81D3EB"></rect>
                  <rect x="2" y="32.3809" width="44" height="4.19048" rx="2" fill="white" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></rect>
                  <path d="M34.4762 37.5714C34.4762 37.0191 34.9239 36.5714 35.4762 36.5714H42.9048C43.4571 36.5714 43.9048 37.0191 43.9048 37.5714V39.8095C43.9048 40.9141 43.0093 41.8095 41.9048 41.8095H36.4762C35.3716 41.8095 34.4762 40.9141 34.4762 39.8095V37.5714Z" fill="#234B9B" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M4.09521 37.5714C4.09521 37.0191 4.54293 36.5714 5.09521 36.5714H12.5238C13.0761 36.5714 13.5238 37.0191 13.5238 37.5714V39.8095C13.5238 40.9141 12.6284 41.8095 11.5238 41.8095H6.09522C4.99065 41.8095 4.09521 40.9141 4.09521 39.8095V37.5714Z" fill="#234B9B" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2 24.7142C2 20.8482 5.13401 17.7142 9 17.7142H39C42.866 17.7142 46 20.8482 46 24.7142V28.3809C46 30.59 44.2091 32.3809 42 32.3809H6C3.79086 32.3809 2 30.59 2 28.3809V24.7142Z" fill="#F59B23" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.1904 6.19043C8.87672 6.19043 6.19043 8.87672 6.19043 12.1904V16.7142C6.19043 17.2665 6.63814 17.7142 7.19043 17.7142H10.3234C9.77567 17.7089 9.33327 17.2633 9.33327 16.7143V13.3333C9.33327 11.1242 11.1241 9.33333 13.3333 9.33333H34.6666C36.8757 9.33333 38.6666 11.1242 38.6666 13.3333V16.7143C38.6666 17.2633 38.2242 17.7089 37.6765 17.7142H40.8095C41.3618 17.7142 41.8095 17.2665 41.8095 16.7142V12.1904C41.8095 8.87672 39.1232 6.19043 35.8095 6.19043H12.1904Z" fill="#F59B23"></path>
                  <path d="M10.3234 17.7142V18.3142C10.6536 18.3142 10.9218 18.0474 10.9234 17.7171C10.925 17.3869 10.6594 17.1175 10.3292 17.1143L10.3234 17.7142ZM37.6765 17.7142L37.6707 17.1143C37.3405 17.1175 37.0749 17.3869 37.0765 17.7171C37.0781 18.0474 37.3462 18.3142 37.6765 18.3142V17.7142ZM6.79043 12.1904C6.79043 9.20809 9.20809 6.79043 12.1904 6.79043V5.59043C8.54535 5.59043 5.59043 8.54535 5.59043 12.1904H6.79043ZM6.79043 16.7142V12.1904H5.59043V16.7142H6.79043ZM7.19043 17.1142C6.96952 17.1142 6.79043 16.9352 6.79043 16.7142H5.59043C5.59043 17.5979 6.30677 18.3142 7.19043 18.3142V17.1142ZM10.3234 17.1142H7.19043V18.3142H10.3234V17.1142ZM10.3292 17.1143C10.1102 17.1121 9.93327 16.9338 9.93327 16.7143H8.73327C8.73327 17.5927 9.44109 18.3057 10.3176 18.3142L10.3292 17.1143ZM9.93327 16.7143V13.3333H8.73327V16.7143H9.93327ZM9.93327 13.3333C9.93327 11.4556 11.4555 9.93333 13.3333 9.93333V8.73333C10.7928 8.73333 8.73327 10.7928 8.73327 13.3333H9.93327ZM13.3333 9.93333H34.6666V8.73333H13.3333V9.93333ZM34.6666 9.93333C36.5444 9.93333 38.0666 11.4556 38.0666 13.3333H39.2666C39.2666 10.7928 37.2071 8.73333 34.6666 8.73333V9.93333ZM38.0666 13.3333V16.7143H39.2666V13.3333H38.0666ZM38.0666 16.7143C38.0666 16.9338 37.8896 17.1121 37.6707 17.1143L37.6823 18.3142C38.5588 18.3057 39.2666 17.5927 39.2666 16.7143H38.0666ZM40.8095 17.1142H37.6765V18.3142H40.8095V17.1142ZM41.2095 16.7142C41.2095 16.9352 41.0304 17.1142 40.8095 17.1142V18.3142C41.6931 18.3142 42.4095 17.5979 42.4095 16.7142H41.2095ZM41.2095 12.1904V16.7142H42.4095V12.1904H41.2095ZM35.8095 6.79043C38.7918 6.79043 41.2095 9.20809 41.2095 12.1904H42.4095C42.4095 8.54535 39.4546 5.59043 35.8095 5.59043V6.79043ZM12.1904 6.79043H35.8095V5.59043H12.1904V6.79043Z" fill="#2B2E32"></path>
                  <circle cx="38.1429" cy="25.5713" r="3.66667" fill="white" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></circle>
                  <circle cx="9.8571" cy="25.5713" r="3.66667" fill="white" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></circle>
                  <rect x="18.762" y="27.1428" width="10.4762" height="5.2381" rx="1" fill="#DD6E25" stroke="#2B2E32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></rect>
                </svg>
              </div>
              <div className='location-item'>3 минуты до Окружной дороги</div>
            </div>
          </div>
        </div>
        <div className='location-map'>
          <div id="map">
            <div style={{ position: 'relative', overflow:'hidden'}}><a href="https://yandex.ru/maps/55/tyumen/?utm_medium=mapframe&utm_source=maps" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}>Тюмень</a><a href="https://yandex.ru/maps/55/tyumen/?ll=65.540896%2C57.108443&utm_medium=mapframe&utm_source=maps&z=15" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Яндекс Карты</a><iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=65.540896%2C57.108443&z=15" width="860" height="600" frameBorder="1" style={{position: 'relative', marginLeft: 'auto', marginRight: 'auto'}}></iframe></div>
          </div>
        </div>
      </div>
      <div className='useless-block'>
          <div className='useless-block--bg'></div>
          <div className='useless-block-text'>
            <h3>Хотите квартиру мечты?</h3>
            <p>Все возможно в Микрорайоне «Lanoriya»</p>
            <a href="#" className="callback-tel-pop">Заказать звонок</a>
          </div>
        </div>
      <div className='container container-contacts' id='contacts'>
        <h2 className='contacts-h2' id='contacts'>Контакты</h2>
        <div className='contacts-info'>
          <div className='contacts-text'>
            <p className='contacts-img'>Офис продаж</p>
            <p>г. Тюмень, ул. Федюнинского, 99, к. 1</p>
            <p>+7 (345) 888-55-12</p>
            <p>+7 (345) 888-55-13</p>
            <p>пн-пт с 9 до 19,сб с 10 до 17,</p>
            <p>вс с 10 до 16</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainContent;
