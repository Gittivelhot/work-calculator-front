*** Settings ***
Documentation           Workcalculator sovelluksen testaukseen
Library    SeleniumLibrary
*** Variables ***
${Browser}      Chrome
${URL}          http://localhost:5173
${LOGIN}          http://localhost:5173/login
${Sleep}	3
${Username}     atte
${Password}     user

*** Test Cases ***
View calculator
    Open Browser    ${URL}       ${Browser}
    Page Should Contain     Työtunti laskuri



Test "Laske" and "Tyhjennä" buttons
    Open Browser    ${URL}    ${Browser}
    #Sleep   ${Sleep}
    Click Button   xpath=//button[contains(text(), 'Laske')]
    #Sleep   ${Sleep}
    Page Should Contain     Työaika tunteina ja minuutteina
    Click Button   xpath=//button[contains(text(), 'Tyhjennä')]
    Page Should Not Contain     Työaika tunteina ja minuutteina
    Close Browser

Fill TimePicker Field and Test calculator
    Open Browser    ${URL}    ${Browser}
    Wait Until Element Is Visible    xpath=/html/body/div/div[2]/div/div[1]/div/div/input
    Press Keys    xpath=/html/body/div/div[2]/div/div[1]/div/div/input    12:00
    Press Keys    xpath=/html/body/div/div[2]/div/div[2]/div/div/input    19:00
    Press Keys    xpath=/html/body/div/div[2]/div/div[3]/div/div/input    15
    Press Keys    xpath=/html/body/div/div[2]/div/div[4]/div/div/input    15
    #Sleep   ${Sleep}
    Click Button   xpath=//button[contains(text(), 'Laske')]
    #Sleep   ${Sleep}
    Page Should Contain     Työaika tunteina ja minuutteina: 7h 0min
    Page Should Contain     Työaika desimaalitunteina: 7.00
    Page Should Contain     Työaika minuutteina: 420min
    Page Should Contain     Tulot ennen veroja: 105.00€
    Page Should Contain     Tulot verojen jälkeen: 89.25€
    Close Browser

Try Login
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input  ${Username}
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div/div[2]/div/div/input  ${Password}
    Click Button   xpath=//button[contains(text(), 'Login')]
    #Sleep   ${Sleep}
    Wait Until Element Is Visible   xpath=/html/body/div/div[1]/header/div/button[2]
    Page Should Contain     Kirjaudu ulos
    Close Browser


Delete work shift
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Press Keys     xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input  ${Username}
    Press Keys     xpath=/html/body/div/div[2]/div/div[2]/div/div[2]/div/div/input  ${Password}
    Click Button   xpath=//button[contains(text(), 'Login')]
    #Sleep   ${Sleep}
    Wait Until Element Is Visible   xpath=/html/body/div/div[1]/header/div/button[1]
    CLick Button   xpath=/html/body/div/div[1]/header/div/button[1]
    Wait Until Element Is Visible    xpath=//a[@href='/hours']
    Click Element    xpath=//a[@href='/hours']
    Sleep   ${Sleep}
    CLick Button   xpath=/html/body/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/div[2]/div/div[3]/div[3]/button
    Sleep   ${Sleep}
    Handle Alert    action=accept  # Käsittele alert-ikkuna
    Sleep   ${Sleep}
    Page Should Contain     Entry deleted successfully
    Close Browser


username too short passwords doesn't match
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  tim
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  tiMo1234
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  tiMo1234
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Käyttäjänimen on oltava vähintään 4 merkkiä pitkä
        Close Browser

username taken
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  niko
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  tiMo1234
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  tiMo1234
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Käyttäjänimi on jo käytössä
        Close Browser

password too short
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  timo1
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  tiMo123
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  tiMo123
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Salasanan on oltava vähintään 8 merkkiä pitkä.
        Close Browser

password does not contain required characters
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  timo1
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  timo1234
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  timo1234
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Sisältää vähintään yhden ison kirjaimen, yhden pienen kirjaimen ja yhden numeron.
        Close Browser

passwords doesn't match
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible   xpath=/html/body/div/div[2]/div/div[2]/div/div[1]/div/div/input
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  timo1
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  tiMo1234
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  tiMo1235
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Salasanat eivät täsmää
        Close Browser

Make new user
    Open Browser    ${LOGIN}    ${Browser}
    Wait Until Element Is Visible       xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Click Button      xpath=/html/body/div/div[2]/div/div[1]/div/div/div/button[2]
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[1]/div/div/input  timo
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div/div/input  tiMo1234
    Press Keys      xpath=/html/body/div/div[2]/div/div[2]/div[1]/div[3]/div/div/input  tiMo1234
    #Sleep   ${Sleep}
    Click Button    xpath=//button[contains(text(), 'Sign up')]
    Sleep   ${Sleep}
    Page Should Contain     Käyttäjän luonti onnistui!
    Close Browser


*** Keywords ***
