<?php

namespace App\Http\Controllers\Staff;
use App\Http\Controllers\Controller;

use App\Models\Episode;
use App\Models\Enroll;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $episode = Episode::where("lesson_id",$id)->get();
        return response()->json(['status' => true, 'data' => $episode ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'video' => 'required|string',
            'id' => 'required|string',
        ]);
        Episode::create([
            'name' => $request->name,
            'video' => $request->video,
            'lesson_id' => $request->id,
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
        $this->validate($request,[
            'video' => 'required|file|mimes:mp4'
        ]);
        $path = $request->file('video')->store('videos');
        return response()->json(['status' => true, 'path' => $path]);
    }
    public function enroll($id, $student){
        $found = Enroll::where('lesson_id',$id)->where("user_id",$student)->first();
        if($found){
            return response()->json(['status' => false ]);
        }
        else{
            Enroll::create([
                'user_id' => $student,
                'lesson_id' => $id,
            ]);
            return response()->json(['status' => true ]);
        }
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function edit(Episode $episode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'video' => 'required|string'
        ]);
        $episode = Episode::find($id);
        $episode->name = $request->name;
        $episode->video = $request->video;
        $episode->save();
        return response()->json(['status' => true ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Episode::find($id)->delete();
        return response()->json(['status' => true ]);
    }
}
