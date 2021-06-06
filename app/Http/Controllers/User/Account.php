<?php

namespace App\Http\Controllers\User;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class Account extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['status' => true]);
    }
    public function information(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:32',
            'phone' => 'required|string|max:10',
        ]);
            $id = Auth::id();
        $user = User::find($id);
        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->save();
        return response()->json(['status' => true]);
    }
    public function password(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required',
        ]);
          
       $hashed = Auth::user()->password;
 
       if (\Hash::check($request->current_password , $hashed )) {
         if (!\Hash::check($request->new_password , $hashed)) {
                $id = Auth::id();
              $user = User::find($id);
              $user->password = Hash::make($request->new_password);
              $user->save();
              return response()->json(['status' => true ]);
            }
         else return response()->json(['status' => false, 'msg' => 'Өөр нууц үг оруулна уу.']);
 
       }
       else return response()->json(['status' => false, 'msg' => 'Нууц үг тохирсонгүй']);
      
    }
    
    public function avatar(Request $request)
    {
        $this->validate($request,[
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $path = $request->file('avatar')->store('avatars');
        $id = Auth::id();
        $user = User::find($id);
        $user->avatar = $path;
        $user->save();
        return response()->json(['status' => true]);
    }
    public function teacher(Request $request)
    {
        $request->validate([
            'avatar' => 'required|string',
            'phone' => 'required|string|max:10',
        ]);
            $id = Auth::id();
        $user = User::find($id);
        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->save();
        return response()->json(['status' => true]);
    }
    public function destroy($id)
    {
        //
    }
}
