import { v4 as uuid } from 'uuid'

import hyundaiLogo from '../../../../../public/assets/logos/brands/hyundaiLogo.png'
import jeepLogo from '../../../../../public/assets/logos/brands/jeepLogo.png'
import porscheLogo from '../../../../../public/assets/logos/brands/porscheLogo.png'
import lamboLogo from '../../../../../public/assets/logos/brands/lamboLogo.png'
import audiLogo from '../../../../../public/assets/logos/brands/audiLogo.png'
import mercedezLogo from '../../../../../public/assets/logos/brands/mercedezLogo.png'
import mitsubishiLogo from '../../../../../public/assets/logos/brands/mitsubishiLogo.png'

export function useBrands() {
  return {
    brands: [
      {
        path: porscheLogo,
        _id: uuid(),
      },
      {
        path: lamboLogo,
        _id: uuid(),
      },
      {
        path: hyundaiLogo,
        _id: uuid(),
      },
      {
        path: jeepLogo,
        _id: uuid(),
      },
      {
        path: audiLogo,
        _id: uuid(),
      },
      {
        path: mercedezLogo,
        _id: uuid(),
      },
      {
        path: mitsubishiLogo,
        _id: uuid(),
      },
    ],
  }
}
