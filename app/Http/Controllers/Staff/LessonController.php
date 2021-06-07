<?php

namespace App\Http\Controllers\Staff;
use App\Http\Controllers\Controller;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        if($user->role == 'admin'){
            $data = Lesson::latest("created_at")->get();
            return response()->json(['status' => true, 'data' => $data]);
        }
        else{
            $data = Lesson::where('created_by', $user->id)->latest("created_at")->get();
            return response()->json(['status' => true, 'data' => $data]);
        }
      
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:32',
            'description' => 'required|string|max:255',
        ]);
        Lesson::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => Auth::id()
        ]);
        return response()->json(['status' => true]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lesson = Lesson::where("id",$id)->where("created_by", Auth::id())->first();
        if($lesson){
            $lesson->owner;
            return response()->json(['status' => true, "data" => $lesson ]);
        }
        else return response()->json(['status' => false ], 404);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function edit(Lesson $lesson)
    {
        return response()->json(['status' => true ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:32',
            'description' => 'required|string|max:255',
        ]);

        $lesson = Lesson::where("id",$id)->where("created_by", Auth::id())->first();
        $lesson->name = $request->name;
        $lesson->description = $request->description;
        $lesson->save();
        return response()->json(['status' => true ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Lesson::where("id",$id)->where("created_by", Auth::id())->delete();
        return response()->json(['status' => true ]);
    }
}
