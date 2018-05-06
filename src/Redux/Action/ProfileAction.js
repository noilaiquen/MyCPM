import { UploadProfileApi } from '../../Api/Auth';

const updateProfileStart = () => ({
   type: 'UPDATE_RPOFILE_START'
});

const updateProfileSuccess = message => ({
   type: 'UPDATE_RPOFILE_SUCCESS',
   message
});

const updateProfileError = message => ({
   type: 'UPDATE_RPOFILE_ERROR',
   message
});

export const resetState = () => ({
   type: 'RESET_STATE'
});


export const updateProfile = profile => (
   dispatch => {
      dispatch(updateProfileStart());
      UploadProfileApi(profile).then(response => {
         dispatch(updateProfileSuccess(response.message));
      }).catch(() => {
         dispatch(updateProfileError('Lỗi rồi!'));
      });
   }
);

