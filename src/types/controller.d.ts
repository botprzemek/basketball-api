namespace Controller {
    type Get<Model> = () => Response<Model>;
    type GetById<Model> = (id: UUID) => Response<Model>;
    type GetByUsername<Model> = (username: UUID) => Response<Model>;
    type Post<Model> = () => Response<Model>;
    type Put<Model> = () => Response<Model>;
    type Delete<Model> = () => Response<Model>;
}
