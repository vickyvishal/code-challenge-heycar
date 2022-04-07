import './App.scss';
import { Content } from './component/content/Content';
import { MainHeader } from './component/header/MainHeader';
import { SideMenuBarLeft } from './component/sideMenubar/SideMenuBarLeft';

function App() {
  return (
    <div className="App">
      <header className='main-header'>
        <MainHeader />
      </header>
      <section className='main-section'>
        <aside className='main-side-menu'>
          <SideMenuBarLeft />
        </aside>
        <section className='content-section'>
          <Content />
        </section>
      </section>

    </div>
  );
}

export default App;
