# monster-killer-project

Simple demo web aplication written in JS. 

This project is a web game where user is fighting with monster.  
User can choose between 4 different actions: 
  - Attack
  - Strong attack
  - Heal
  - Show log
PLayer and monster have their health bars. In addition, player have bonus life. 

![image](https://user-images.githubusercontent.com/44081987/153305414-06a0d84a-fc6f-4f0d-8161-3dc0f177953e.png)

Game starts with web alert where player have to set health points for both fighters. 

![image](https://user-images.githubusercontent.com/44081987/153306799-63b68b1f-437a-490e-a11f-af2a5e70c425.png)

After each player action (attack or heal), monster hits player and deals random damage. Also every player attack deals random damage value to a monster.
After each hit, health bar is updated:

![image](https://user-images.githubusercontent.com/44081987/153308605-f868b3b1-ffca-4674-967a-84082b49cf25.png)

Game wins this fighter which first deals damage value which is equal to sum of total hit points. 
Depending on player win or lose appropriate alert message is displayed : 

In case of user win: 

![image](https://user-images.githubusercontent.com/44081987/153307149-cf5864fd-a374-40b2-ade2-1f68fd42db69.png)

If user lose:

![image](https://user-images.githubusercontent.com/44081987/153308476-612beb90-83c0-4966-abe0-421ba200e5f7.png)

