
export default class HomePage{
constructor(page){
    this.page=page;
}
async navigateToHomePage(){
    await this.page.goto('https://demoqa.com/');

}


}


