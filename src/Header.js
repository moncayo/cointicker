import './Header.css'
import { GoMarkGithub } from 'react-icons/go'

const Header = (props) => {
    return(
        <div class="header-container">
            <div class="header-title">
                CoinTicker
            </div>
            <div 
                class="header-github"
                onClick={() => {window.open('https://github.com/moncayo', '_blank')}}
                ><GoMarkGithub size={35}/></div>
        </div>
    )
}

export default Header