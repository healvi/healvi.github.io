import {getLiga , getMatches, getSavedTeam , getSavedTeamById} from "./api.js"
const logic = (page) => {
  if(page == 'KlasemenLiga') {
    // const team = getSavedTeamById();
    const Liga = getLiga();
    return {Liga}
  } else if(page == 'Match') {
    var btnSave = document.getElementById("save");
    var btndelete = document.getElementById("delete");
    if (!btnSave == null ){
      btnSave.style.display = 'none';
      return {mathes,btnSave}
    } else if (!btndelete == null) {
      btndelete.style.display = 'none';
      return {mathes,btnSave}
    }
    const mathes = getMatches();
    return {mathes}
  
  } else if (page === "saved") {
    const team = getSavedTeam();
    return {team}
  }

}
export { logic }