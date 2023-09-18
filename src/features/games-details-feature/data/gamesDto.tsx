interface IGameDto {
  id: number,
  title: string,
//   slug: string,
  time_duration: number,
  price: number,
//   game_type_id: number,
//   is_active: number,
//   deleted_at: string,
//   created_at: string,
//   updated_at: string
  logo: string,
  guest_min: number,
  guest_max: number,
  description: string,
  age_limit: number,
  images: any,
  video: any,
//   descriptio: any,
  genre: string,
//   pivot: {
//     room_id: number,
//     game_id: number
//   }
//   rooms?: Array<IRoom>,
}

export default IGameDto;