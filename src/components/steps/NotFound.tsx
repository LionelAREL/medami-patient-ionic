import { constant } from "../../styles/constants"

const NotFound = () => {
  return (
      <div style={{...constant.textInputStyle}}>
       Le questionnaire de santé auquel vous tentez d'accéder est <strong>introuvable</strong>
        <br/>
        <br/>
        Veuillez en faire part à votre professionnel de santé.
      </div>
  )
}

export default NotFound
