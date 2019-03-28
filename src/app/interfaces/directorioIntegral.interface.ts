export interface secretariosInterface {
  id_directorio: number;
  id_ads: string;
  TITULAR: string;
  CARGO: string;
  FotoFuncionario?: string;
  PATH: string;
}

export interface dependenciaInterface {
  ID: string;
  Descrip: string;
  IdAds2: string;
  TITULAR: string;
}
