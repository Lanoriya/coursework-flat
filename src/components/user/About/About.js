import './About.css';

function About() {
  return (
    <div className='about-header'>
      <h4 className='about-title'>О проекте</h4>
      <div className='about-text'>
        <div className='about-text--left'>
          <p className='about-text--big'>Lanoriya — район на Мельникайте, создаваемый для комфортного и уютного проживания. 14 очередей строительства спроектированы таким образом, чтобы продумать каждую деталь для личного комфорта, сохранив при этом семейную атмосферу.</p>
          <p className='about-text--big'>Уникальное расположение комплекса не только позволяет оперативно добираться до центра и периферии города, но также выезжать на природу. Школа, детские сады, физкультурно-оздоровительный комплекс находятся в пешей доступности, но не мешают проживанию за счёт расположения в отдельной локации района.</p>
          <p className='about-text--big'>Каждая очередь имеет свой центр притяжения — изолированный двор с интерактивной площадкой для отдыха и развлечений.</p>
          <p className='about-text--big'>Lanoriya — это территория семейных ценностей.</p>
        </div>
        <div className='about-text--right'>
          <div className='about-text-block'>
            <div className='about-text-title'>Зеленое окружение</div>
            <p className='about-text-p'>внутри района нет парка, Lanoriya — это и есть парк</p>
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
    </div>
  )
}

export default About;