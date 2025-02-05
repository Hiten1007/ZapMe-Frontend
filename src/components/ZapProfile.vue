<script setup lang = "ts">
</script>

<template>
    <div class="profilebox">
        <h1 class="profileheader">Profile</h1>
        <hr class="line" />

        <div class="mainarea">
            <div class="profileinfobox">
                <div class="profileinfo">
                    <div class="chatbutton"><img src = "../assets//image copy 7.png" class = "profilepic" /></div>
                    <div class="infobox">
                        <div class="friends">
                            <h2 class = friendstext>Friends</h2>
                            <img src = "../assets/image copy 9.png" class="friendsimg" />
                        </div>
                        <div>
                            <div class="usernamebox">
                                <h1 class="username">username</h1>
                                <img src="../assets/image copy 10.png" class="usernameedit" />
                            </div>
                            <div class="personbox">
                                <h2 class="realname">name</h2>
                                <div class="attributes">
                                   <p class="attribute">Extrovert</p>
                                   <div class="dot"></div>
                                   <p class="attribute">Outgoing</p>
                                   <div class="dot"></div>
                                   <p class="attribute">Batman</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
                   
                </div>
                <div class="buttonbox">
                        <button class="buttondiv">Connect</button>
                </div>
            </div>
            <div class="linksbox">
                <div class = "linkstext">Connect : </div>
                <div class="linkbox">
                    <div class="link">
                        <img src="../assets/image copy 11.png" alt="" class=" linkimg">
                        <h4 class="linktext">Facebook</h4>
                    </div>
                    <div class="link">
                        <img src="../assets/image copy 12.png" alt="" class="linkimg">
                        <h4 class="linktext">Instagram</h4>
                    </div>
                    <div class="link">
                        <img src="../assets/image copy 13.png" alt="" class="linkimg">
                        <h4 class="linktext">Snapchat</h4>
                    </div>
                </div>
            </div>
            <div class="aboutsection">
                <div class="aboutheader">
                    <h2 class="abouttext">About Me</h2>
                    <img src="../assets/image copy 14.png" class="abouteditimg" />
                </div>
                <textarea class="textbox" placeholder="Tell Us About Yourself..."> </textarea>
            </div>
        </div>
    </div>
</template>

<style scoped>
.abouteditimg{
    width:1.7rem;
    height:1.7rem
}

.aboutheader{
    display:flex;
    justify-content: space-between;
    padding:0 1rem 0 1.25rem
}

.abouttext{


font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 1.6rem;
text-decoration-line: underline;

color: #000000;


}

.textbox{
    resize: none;
    height:8rem;
    width:33rem;
    border-radius: 1rem;
    margin-top:1rem;
    border:none; 
    outline: none;
background: #D9D9D9;
padding: 1.2rem;
font-size: 0.9rem
}

.aboutsection{
    margin:2rem 0rem 0rem 15rem
}

.linkimg{
    width:1.65rem;
    height: 1.65em
}
.linktext{


font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 400;
font-size: 1.2rem;
line-height: 1.4rem;

color: #000000;

}

.linkbox{
    background:#D9D9D9;
    margin:1rem 3rem 0rem 0rem ;
    padding:2rem;
    display:flex;
    flex-direction : column;
    gap : 2rem;
    border-radius: 2rem
}

.link{
    display:flex;
    gap: 1rem;
}

.linkstext{
    font-family: 'Kumbh Sans';
font-style: normal;
font-weight: 550;
font-size: 1.3rem;
line-height: 1.45rem;
padding-left:1rem;
color: #000000;
}

.linksbox{
    margin: 3.4rem 0 0 6.7rem;
}

.buttondiv{

position: relative;
width: 9.2rem;
height: 2.8rem;

border: 0;
outline: 0;

background: #007BFC;
border-radius: 25rem;


font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 1rem;
line-height: 1.2rem;

letter-spacing: 0.04rem;

color: #FFFFFF;
}


.buttonbox{
    margin-left:11rem
}

.attribute{


font-family: 'Inter';
font-style: normal;
font-weight: 550;
font-size: 1.1rem;
line-height: 1.4rem;

color: #949494;


}

.dot{
    /* Ellipse 10 */

width: 0.3rem;
height: 0.3rem;
border-radius:10rem;
margin-top:0.4rem;
background: #949494;

}
.attributes{
    display:flex;
    gap:1rem
}

.personbox{
    margin-top:0.6rem
}


.realname{

font-family: 'Jersey 10';
font-style: normal;
font-weight: 400;
font-size: 2.1rem;
line-height: 2.3rem;

color: rgba(0, 0, 0, 0.5);


}

.usernameedit{
    width:1.4rem;
    height:1.4rem;
    margin-top:0.4rem
}

.usernamebox{
    display:flex;
    gap:1rem
}

.username{

font-family: 'Inter';
font-style: normal;
font-weight: 750;
font-size: 1.9rem;
line-height: 2rem;

color: #000000;


}

.userinfobox{
    margin-top:2.2rem
}

.infobox{
    width:25rem
}

.friends{
    display:flex;
    gap:0.8rem;
    margin-left:16rem 
}

.friendsimg{
    width:1.6rem;
    height:1.6rem
}

.friendstext{

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 2rem;

color: #000000;


}

.profileinfobox{
    padding:4rem 0 0 10rem
}

.profileinfo{
    display:flex;
    gap:2rem
}
.mainarea{
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    gap:1rem
}
.profileheader{

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 1.4rem;
line-height: 2rem;
padding:0.4rem 0.1rem 0.1rem 0.9rem;

color: #000000;


}
.line{
background: #FF6633;

border:none; 
height:0.0925rem
}
.profilebox{
    width:100vw
}

.profilepic{
    border-radius: 25rem;
    width:11rem;
    height:11rem
}

</style>