import styled from 'styled-components';
import { NavBackgroundColor, ButtonColors, AboutBackground, LearnMoreBtnColor, BoxShadowColor, FormInputColor, FooterBackground, SideBarLinkColors, RegisterationFrameBackground, ButtonShadow, ButtonBorderColors, CardBackground } from './colors';
import Testimonial from '../../../assets/testimonial.png'
import Register from '../../../assets/register.png'
export const Contain = styled.div`
    width: 100%;
    padding-left: 2px;
    padding-right: 2px;
    margin-left: auto;
    margin-right: auto;
`

export const NavStyle = styled.div`
    background-color: ${NavBackgroundColor};
    .navbar-nav{
        a{
            color: black !important;
            font-size: large;
            font-weight: 500;
        }
        button{
            background: ${ButtonColors} !important;
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important;
            outline: ${ButtonColors};
            border-color: ${ButtonColors};
            &:hover{
                background: ${ButtonColors} !important;
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                outline: ${ButtonColors};
            }
            &:focus{
                background: ${ButtonColors} !important;
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                outline: ${ButtonColors};
            }
            &:click{
                background: ${ButtonColors} !important;
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                outline: ${ButtonColors};
            }
        }

    }
`

export const CarouselStyle = styled.div`
margin-bottom: -25px;
    .carousel-control-prev, .carousel-control-next{
        position: relative;
    top: -60px;
    bottom: 0;
    z-index: 1;
    left: 85vw !important;
    display: inline;
    -ms-flex-pack: center;
    justify-content: center;
    width: 200px;
    color: black;
    text-align: center;
    opacity: 1; 
    transition: opacity 0.15s ease;
    background: ${ButtonColors} !important;
    box-shadow: ${ButtonShadow};
    border-color: ${ButtonBorderColors} !important
    box-shadow: ${ButtonShadow};
    border-color: ${ButtonBorderColors} !important;
    padding: 13px;
    margin: 5px;
    border-radius: 50px;
        @media(max-width: 500px){
            left: 70vw !important;
        }
        @media(max-width: 400px){
            left: 60vw !important;
            pading: 10px;
        }
    }
`

export const AboutStyle = styled.div`
    background-color:${AboutBackground};
    padding: 20px;
    img{
        height: 370px
    }
    h1{
        margin-top: 30px;
        text-transform: uppercase;
    }
    .toggle{
        h3{
            text-align: center;
            margin: 20px 0;
            font-size: larger;
            font-weight: 400;
        }
        .details{
            margin: 40px 0;
            transition: display 0.15s ease;
            button{
                background-color: ${LearnMoreBtnColor};
                outline: ${LearnMoreBtnColor} !important;
                border-color: ${LearnMoreBtnColor} !important;
                &:focus{
                    background-color: ${LearnMoreBtnColor} !important;
                    outline: ${LearnMoreBtnColor} !important;
                    border-color: ${LearnMoreBtnColor} !important;
                }
                &:click{
                    background-color: ${LearnMoreBtnColor} !important;
                    outline: ${LearnMoreBtnColor} !important;
                    border-color: ${LearnMoreBtnColor} !important;
                }
                &:hover{
                    background-color: ${LearnMoreBtnColor} !important;
                    outline: ${LearnMoreBtnColor} !important;
                    border-color: ${LearnMoreBtnColor} !important;
                }
            }
            p{
                margin: 40px 0;
                text-align: justify;
            }
        }
        .hr{
            height: 3px;
            width: 100%;
            background-color: ${LearnMoreBtnColor};
            opacity: 0.6;
            text-align: center;
            .active{
                background: ${ButtonColors} !important;
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important;
                height: 4px;
                width: 80%;
                opacity: 1;
                transition: opacity 0.15s ease;
                margin: 0 30px;
            }
            .not-active{
                background-color: transparent;
                background: ${ButtonColors} !important;
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important
                box-shadow: ${ButtonShadow};
                border-color: ${ButtonBorderColors} !important;
                opacity: 0;
                transition: opacity 0.15s ease;
                height: 3px;
                width: 80%;
                margin: 0 auto;
            }
        }
    }
`

export const CoursesStyle = styled.div`
    margin: 30px 0;
    h2{
        margin: 40px 0;
    }
`

export const RegisterStyle = styled.div`
    padding: 40px 0;
    // background-color: #FAFAFA;
    background-image: url(${Register});
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: cover;
    .grow{
        display: grid;
        grid-template-columns: .1fr 4fr;
        .ball-span{
            display: inline-grid;
            grid-template-columns: 0fr 3fr;
            margin: 25px 0;
        }
        .balls{
            width: 2px;
            height: 16px;
            margin: 5px 0;
            border-radius: 50px;
            position: relative;
            display: block;
            padding: 9px;
            right: 2.49rem;
            background: ${ButtonColors} !important;
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important;

        }
    }
    .list{
        background-color: ${LearnMoreBtnColor};
        width: 1px;
        min-height: 170px;
        padding: 2px 0;
        
    }
`

export const RegisterFormStyle = styled.div`
    box-shadow: 2px 2px 2px 2px ${BoxShadowColor};
    padding: 20px;
    width: 80%;
    border-radius: 5px;
    background: white;
    form{
        margin: 20px 0;
    }
    .form-control{
        outline: ${FormInputColor} !important;
        background-color: ${FormInputColor} !important;
    }
    button{
        background-color: ${LearnMoreBtnColor};
        outline: ${LearnMoreBtnColor} !important;
        border-color: ${LearnMoreBtnColor} !important;
        margin-top: 90px
        &:focus{
            background-color: ${LearnMoreBtnColor} !important;
            outline: ${LearnMoreBtnColor} !important;
            border-color: ${LearnMoreBtnColor} !important;
        }
        &:click{
            background-color: ${LearnMoreBtnColor} !important;
            outline: ${LearnMoreBtnColor} !important;
            border-color: ${LearnMoreBtnColor} !important;
        }
        &:hover{
            background-color: ${LearnMoreBtnColor} !important;
            outline: ${LearnMoreBtnColor} !important;
            border-color: ${LearnMoreBtnColor} !important;
        }
    }
}
`

export const TestimonialsStyle = styled.div`
    padding: 50px 0;
    background: transparent url(${Testimonial}) 0% 0% no-repeat padding-box;
    opacity: 1;
    backdrop-filter: blur(17px);
    -webkit-backdrop-filter: blur(17px);
    .message{
        img{
            position: relative;
            top: 80px;
        }
        .paragraph{
            background-color: white;
            box-shadow: 2px 2px 2px 2px ${BoxShadowColor};
            width: 100%;
            padding: 20px;
            border-radius: 10px;
            p{
                margin-top: 60px;
            }
        }
    }
`

export const FAQStyle = styled.div`
    margin: 30px 0;
    button{
        text-decoration: none;
        &:hover{
            text-decoration: none;
        }
        &:click{
            text-decoration: none;
        }
        &:focus{
            text-decoration: none;
        }
    }
    h3{
        font-weight: 300;
        color: black;
    }
`

export const FooterStyle = styled.div`
    padding: 70px 0;
    background-color: ${FooterBackground};
    a{
        color: inherit;
        text-decoration: none;
        &:hover{
            text-decoration: none;
        }
        &:click{
            text-decoration: none;
        }
        &:focus{
            text-decoration: none;
        }
    }
    button{
        margin-top: 20px;
        background: ${ButtonColors} !important;
        box-shadow: ${ButtonShadow};
        border-color: ${ButtonBorderColors} !important
        box-shadow: ${ButtonShadow};
        border-color: ${ButtonBorderColors} !important;
        outline: ${ButtonColors};
        border-color: ${ButtonColors};
        &:hover{
            background: ${ButtonColors} !important;
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            outline: ${ButtonColors};
        }
        &:focus{
            background: ${ButtonColors} !important;
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            outline: ${ButtonColors};
        }
        &:click{
            background: ${ButtonColors} !important;
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            box-shadow: ${ButtonShadow};
            border-color: ${ButtonBorderColors} !important
            outline: ${ButtonColors};
        }
    }
`
export const ButtonStyle = styled.button`
    margin-top: 20px;
    background: ${ButtonColors} !important;
    box-shadow: ${ButtonShadow};
    border-color: ${ButtonBorderColors} !important
    outline: ${ButtonColors} !important;
    color: white !important;
    &:hover{
        background: ${ButtonColors} !important;
        box-shadow: ${ButtonShadow};
        border-color: ${ButtonBorderColors} !important
        outline: ${ButtonColors};
    }
    &:focus{
        background: ${ButtonColors} !important;
        box-shadow: ${ButtonShadow};
        border-color: ${ButtonBorderColors} !important
        outline: ${ButtonColors};
    }
    &:click{
        background: ${ButtonColors} !important;
        box-shadow: ${ButtonShadow};
        border-color: ${ButtonBorderColors} !important
        outline: ${ButtonColors};
    }
`
export const FormsFrame = styled.div`
    background-color: ${RegisterationFrameBackground};
    min-height: 100vh;
    padding: 20px 0;
    .form{
        margin-top: 60px;
    }
    p{
        margin-left: 30px;
        margin-top: 20px;
    }
    @media(max-width: 770px){
        .image{
            position absolute;
            top: 0;
            margin-bottom: 50px
            img{
                width: 100px;
            }
        }
    }
`

export const BackdropStyle = styled.div`
    position: absolute;
    width: 100%;
    background: rgba(3,0,0,0.3);
    z-index: 2;
    transition: display 0.15s ease;
    @media(max-width: 992px){
        display: ${props => props.Toggle? "block" : "none"};
        visibility:${props => props.Toggle? 'visible' : 'hidden'};
        opacity:${props => props.Toggle? '1' : '0'};
        transition: 0.3s ease-out;
        height: 3000px;
    }
`

export const SidebarStyle = styled.div`
    width: 255px;
    height: 100%;
    top: 0;
    background: ${NavBackgroundColor} 0% 0% no-repeat padding-box;
    // box-shadow: 0px 0px 5px ${BoxShadowColor};
    opacity: 1;
    position: fixed;
    transition: 0.3s ease-out;
    z-index: 2;
    h6{
        font-weight: 600px;
    }
    ul{
        list-style: none;
        li{
            padding: 30px 0;
        }
        img{
            width: 20px;
            margin-right: 20px;
        }
        a{
            color: ${SideBarLinkColors}
            text-decoration: none;
            p{
                display: inline;
            }
        }
        .active{
            background: transparent linear-gradient(180deg, #29CB97 0%, #1AA175 100%) 0% 0% no-repeat padding-box;
            box-shadow: 0px 5px 15px #ACB2C1;
            position: relative;
            border-radius: 5px;
            z-index: 2;
            width: 16rem;
            right: 24px;
            padding: 20px;
            opacity: 1;
            a{
                color: ${NavBackgroundColor};
            }

        }
    }
    @media(max-width: 992px){
        display: ${props => props.Toggle? "block" : "none"};
        visibility:${props => props.Toggle? 'visible' : 'hidden'};
        opacity:${props => props.Toggle? '1' : '0'};
        transition: 0.3s ease-out;
    }
`

export const ToggleStyle = styled.div`
    display: none;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    width: 52px;
    box-shadow: 1px 1px 1px 1px ${BoxShadowColor} !important;
    span{
        display: block
        height: 3px;
        width: 20px;
        margin: 5px;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    &:click{
        box-shadow: 0px 0px 0px 0px ${BoxShadowColor} !important;

    }
    @media(max-width: 992px){
        display: block;
    } 
`

export const DashboardStyle = styled.div`
    .courses{
        div{
            padding: 8px ;

        }
        background-color: ${NavBackgroundColor};

    }
    
    .referral{
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 10px;
        background-color: ${NavBackgroundColor};
        h6{
            margin-top: 10px;
        }
    }
    .left {
        border-right: 15px solid #F5F6FA;
    }

    .stages{
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .balance-personal{
        div{
            position: inherit !important;
            .personal-card{
                width: 100%;
                right: 0;
            }
        }
    }
`

export const SkeletonStyle = styled.div`
    background-color: #F5F6FA;
    min-height: 100vh;
    padding: 20px 10px;

`

export const MembersListStyle = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    transition:  0.15s ease;
    padding: 10px;
    border-radius: 5px;
    .first{
        
        img{
            width: 50px;
        }
        display: grid;
        grid-template-columns: .4fr 1fr 1fr;
    }
    .bottom{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &:hover{
        box-shadow: 2px 2px 5px 5px ${BoxShadowColor} !important;


    }
`

export const StageDivStyle = styled.div`
    background-color: #E5E9F2;
    height: 5px;
    width: 100%;
    margin: 10px 0;
    div{
        background-color: ${props => props.Color == 5? "#FF6400" : props.Color == 4? "#29CB97" : props.Color == 3? "#4072EE" : props.Color == 2? "#B558F6" : props.Color == 1? "#ffffff" : ""} !important;
        box-shadow: ${ButtonShadow};
        border-radius: 3px;
        opacity: 1;
        width: ${props =>  props.Color == 5? "100%" : props.Color == 4? "75%" : props.Color == 3? "50%" : props.Color == 2? "25%" : props.Color == 1? "0%" :"0%"};
        height: inherit;
    }
`

export const PersonalStyle = styled.div`
    background: ${NavBackgroundColor};
    position: fixed;
    padding: 30px 20px;
    top: 0;
    .scroller{
        height: 300px;
        overflow: auto;
        width: 100%;
    }
    .personal-card{
        top: 15px;
        font-weight: 700;
        margin-bottom: 30px;
        position: relative;
        right: 3rem;
        color: white;
        padding: 20px
        width: 135%;
        background: ${CardBackground};
        .balance{
            display: grid;
            grid-template-columns: 1fr 1fr
        }
    }
    .buttons{
        border-top: 2px solid #F5F6FA
        border-bottom: 2px solid #F5F6FA
        padding-top: 30px;
        padding-bottom: 30px;
        button{
            font-size: x-small;
            width: max-content;
            padding: 10px 15px;
        }
        .first-btn{
            background:  transparent linear-gradient(180deg, #F66798 0%, #B84979 100%) 0% 0% no-repeat padding-box;
            color: white;
            border: 0px solid transparent
        }
        .second-btn{
            opacity: 0.43;
            border: 1px solid #707070;
            color: black;
            background: transparent;
        }
    }
    @media(max-width: 992px){
        position: inherit;
        .personal-card{
            position: inherit;
            top: 0;
            right: 0;
            width: 100%;
        }
    }
`

export const EarningStyle = styled.div`
    width: 100%;
    padding: 20px;
    background: transparent linear-gradient(180deg, #FFEEEE 0%, #FFF8F8 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 5px #E5E9F2;
    opacity: 1;
    .total{
        position: absolute;
        left: 90px;
        top: 80px;    
        display: inline-grid;
        grid-template-columns: 1fr
    }
    table{
        width: 70%;
        height: 162px;
        margin: 30px 0;
        tr{
            td{
                // width: 200px;
            }
        }
    }
`