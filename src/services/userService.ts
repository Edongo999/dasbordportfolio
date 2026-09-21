import api from "@/api/api";

export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;

  id?: number;

  name: string;

  email: string;

  image_url?: string;
}

export interface ProfileResponse {
  status: string;

  user: User;
}

export interface UpdatePasswordPayload {
  current_password: string;

  new_password: string;

  new_password_confirmation: string;
}

const userService = {
  profile: () =>
    api.get<ProfileResponse>(
      "/user/profile",
    ),

  updateName: (data: { name: string }) =>
    api.post(
      "/user/update-name",
      data,
    ),

  updatePhoto: (formData: FormData) =>
    api.post(
      "/user/update-photo",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    ),

  updatePassword: (
    data: UpdatePasswordPayload,
  ) =>
    api.post(
      "/user/update-password",
      data,
    ),
};

export default userService;